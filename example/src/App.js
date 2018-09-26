import React, { Component } from 'react'
import { Provider } from 'stamen'

import Counter from './Counter'
import HocCounter from './HocCounter'
import counterStore from './counterStore'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider counterStore={counterStore}>
          <Counter />
          <HocCounter />
        </Provider>
      </div>
    )
  }
}

export default App
