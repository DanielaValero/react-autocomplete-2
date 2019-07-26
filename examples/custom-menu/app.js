import { hot } from 'react-hot-loader';
import React from 'react'
import DOM from 'react-dom'
import Autocomplete from '../../lib/index'
import { fakeCategorizedRequest } from '../../lib/utils'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      unitedStates: [],
      loading: false
    }
    this.requestTimer = null
  }

  render() {
    return (
      <div>
        <h1>Custom Menu</h1>
        <p>
          While Autocomplete ships with a decent looking menu, you can control the
          look as well as the rendering of it. In this example we will group the states
          into the region where they belong.
        </p>
        <label htmlFor="states-autocomplete">Choose a state from the US</label>
        <Autocomplete
          value={this.state.value}
          inputProps={{ id: 'states-autocomplete' }}
          items={this.state.unitedStates}
          getItemValue={(item) => item.name}
          suggestionsMenuId="input-name-suggestions"
          onSelect={(value, state) => this.setState({ value, unitedStates: [state] }) }
          onChange={(event, value) => {
            this.setState({ value, loading: true, unitedStates: [] })
            clearTimeout(this.requestTimer)
            this.requestTimer = fakeCategorizedRequest(value, (items) => {
              this.setState({ unitedStates: items, loading: false })
            })
          }}
          renderItem={(item, isHighlighted) => (
            item.header ?
              <div
                role="option"
                className="item item-header"
                key={item.header}
              >{item.header}</div>
              : <div
                className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                key={item.abbr}
              >{item.name}</div>
          )}
          renderMenu={(items, value) => (
            <div className="menu" id="input-name-suggestions" role="listbox">
              {value === '' ? (
                <div className="item">Type of the name of a United State</div>
              ) : this.state.loading ? (
                <div className="item">Loading...</div>
              ) : items.length === 0 ? (
                <div className="item">No matches for {value}</div>
              ) : items}
            </div>
          )}
          isItemSelectable={(item) => !item.header}
        />
      </div>
    )
  }
}

DOM.render(<App/>, document.getElementById('container'))

export default hot(module)(App);