<img src="http://forsigner.com/images/stamen-logo.jpg" height="200px" align="right"/>

# Stamen

[![npm](https://img.shields.io/npm/v/stamen.svg)](https://www.npmjs.com/package/stamen) [![Build Status](https://travis-ci.org/forsigner/stamen.svg?branch=master)](https://travis-ci.org/forsigner/stamen) [](https://coveralls.io/github/forsigner/stamen?branch=master)
[![npm](https://img.shields.io/badge/TypeScript-%E2%9C%93-007ACC.svg)](https://www.typescriptlang.org/) [![GitHub license](https://img.shields.io/github/license/forsigner/stamen.svg)](https://github.com/forsigner/stamen/blob/master/LICENSE)

> A React state management library Based on Hooks

## Installation

```sh
yarn add stamen
```

## Quick Start

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'stamen'

const CounterStore = createStore({
  state: {
    count: 10,
  },
  reducers: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
  },
  effects: {
    async asyncIncrement(dispatch) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      dispatch('increment')
    },
  },
})

const App = () => {
  const { get, dispatch } = CounterStore.useStore()
  const count = get(s => s.count)
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch('decrement')}>-</button>
      <button onClick={() => dispatch('increment')}>+</button>
      <button onClick={() => dispatch('asyncIncrement')}>async+</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

Check on CodeSandbox: [Basic](https://codesandbox.io/s/0vrrlkjx5w) | [Async](https://codesandbox.io/s/kmq65p3l97)

## Examples

- [Basic](https://github.com/forsigner/stamen/tree/master/examples/basic) - Most basic usage
- [Async](https://github.com/forsigner/stamen/tree/master/examples/async) - To query data from remote server
- [TodoMVC](https://github.com/forsigner/stamen/tree/master/examples/todomvc) - stamen version TodoMVC
- [Recommended usage](https://github.com/forsigner/stamen/tree/master/examples/recommended-usage) - Recommended practice with stamen

## Guide

Stamen is simple, only two step to setup it.

Step 1: creat a store

```js
const CounterStore = createStore({
  state: {
    count: 10,
  },
  reducers: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
  },
})
```

Step 1: use it in view

```js
const App = () => {
  const { get, dispatch } = CounterStore.useStore()
  const count = get(s => s.count)
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch('decrement')}>-</button>
      <button onClick={() => dispatch('increment')}>+</button>
    </div>
  )
}
```

That's it!

## Api

**Overview**

```js
const SomeStore = createStore({
  state: {},
  reducers: {},
  affects: {},
})

const { get, dispatch } = SomeStore.useStore()
```

### state

The initial state of a Store.

```js
const SomeStore = createStore({
  state: {
    count: 0,
  },
})
```

### reducers

Two type action in Stamen: reducers and effects, you can update state in reducers only. 


```js
const SomeStore = createStore({
  reducers: {
    increment(state, payload) {
      state.count += payload
    },
  },
})
```

### effects

You can handle async actions in effects. Such as Fecthing data via nenwork

```js
const SomeStore = createStore({
  effects: {
    async asyncIncrement(dispatch) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      dispatch('increment')
    },
  },
})
```

### get

Get state in view using react hooks api.

```js
const App = () => {
  const { get } = CounterStore.useStore()
  const count = get(s => s.count)
  return <span>{count}</span>
}
```

### dispatch

Dispatch an Action to update state.

```js
const App = () => {
  const { get, dispatch } = CounterStore.useStore()
  const count = get(s => s.count)
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch('decrement')}>-</button>
      <button onClick={() => dispatch('increment')}>+</button>
    </div>
  )
}
```

## FAQ

**Support Typescript?**

Yes, it is total type-safety. Perfect with Typescript.

**Single store or Multiple store?**

Personally, I would recommend a multi-part solution. More flexible and less Potential performance issues.

## License

[MIT License](https://github.com/forsigner/stamen/blob/master/LICENSE)
