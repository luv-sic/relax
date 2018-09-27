# Stamen

> A sexy state container for React

- **Lightweight** less 1kb after gzip, no dependences
- **Minimalist** zero boilerplate, minimal [api](#api)
- **Intuitive** no complex concept, thinking in React
- **maintainable** Easy to write maintainable and readable code


## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-Usage)
- [Examples on CodeSandbox](#examples-on-codeSandbox)
- [API](#api)

## Installation

```sh
yarn add stamen
```

### Basic Usage

```js
import React from 'react'
import { render } from 'react-dom'
import { Provider, Consumer, Store } from 'stamen'

class CounterStore extends Store {
  count = 0
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

### Examples on CodeSandbox

[Basic](https://codesandbox.io/s/0vrrlkjx5w) · [Use Hoc](https://codesandbox.io/s/0vrrlkjx5w) · [Async](https://codesandbox.io/s/0vrrlkjx5w)

### API

- [Store](#Store)
- [Provider](#Provider)
- [Consumer](#Consumer)
- [consume](#consume)

#### Store

Create a store by Extends `Store`, `Store` exposes a `setState()` method to update state.

```js
class CounterStore extends Store {
  count = 0
  increment() {
    this.setState({ count: this.count + 1 })
  }
  decrement() {
    this.setState({ count: this.count - 1 })
  }
}
```

#### Provider

```js
<Provider counterStore={new CounterStore()}>
  <Counter />
</Provider>
```

#### Consumer

consume store in Component like React context api.

```js
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
```

If you only need part of your state, you can `pick` it

```js
<Consumer pick={store => store.counterStore.count}>
  {count => <span>{count}</span>}
</Consumer>
```

If you need multiple values, you can return an object:


```js
<Consumer pick={({userStore}) => ({ nick: userStore.nick, name: userStore.name })}>
  {({ nick, name }) => <span>{nick}-{name}</span>}
</Consumer>
```

#### consume

Sometimes you want to access store in React lifecycles, you will need a Hoc.

```js
@consume(({counterStore}) => counterStore)
class Counter extends Component {
  render() {
    return <div>{this.props.counterStore.count}</div>
  }
}
```
