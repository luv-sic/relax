# Stamen

> Humanized design State

## Installation

```sh
yarn add stamen
```

## Example

```js
import React from 'react'
import { render } from 'react-dom'
import { Provider, Consumer, Store } from 'stamen'

class CounterStore extends Store {
  count: 0
  increment() {
    this.setState({ count: this.count + 1 })
  }
  decrement() {
    this.setState({ count: this.count - 1 })
  }
}

const Counter = () => (
  <Consumer>
    {({ counterStore }) => (
      <div>
        <span>{counterStore.count}</span>
        <button onClick={() => counterStore.decrement()}>-</button>
        <button onClick={() => counterStore.increment()}>+</button>
      </div>
    )}
  </Consumer>
)

render(
  <Provider counterStore={new CounterStore()}>
    <Counter />
  </Provider>,
  document.getElementById('root'),
)
```
