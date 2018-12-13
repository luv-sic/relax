import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, Subscribe, Container } from 'unstated'

interface CounterState {
  count: number
}

class CounterContainer extends Container<CounterState> {
  state = {
    count: 0,
  }

  increment() {
    this.setState({ count: this.state.count + 1 })
  }

  decrement() {
    this.setState({ count: this.state.count - 1 })
  }
}

function Counter() {
  return (
    <Subscribe to={[CounterContainer]}>
      {(counter: CounterContainer) => (
        <div>
          <button onClick={() => counter.decrement()}>-</button>
          <span>{counter.state.count}</span>
          <button onClick={() => counter.increment()}>+</button>
        </div>
      )}
    </Subscribe>
  )
}

ReactDOM.render(
  <Provider>
    <Counter />
  </Provider>,
  document.getElementById('root'),
)
