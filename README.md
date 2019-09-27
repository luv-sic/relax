<img src="http://forsigner.com/images/dahlia/dahlia-stamen.svg"  align="center"/>

# Relax

[![npm](https://img.shields.io/npm/v/relax-ts.svg)](https://www.npmjs.com/package/relax-ts) [![Build Status](https://travis-ci.org/luv-sic/relax.svg?branch=master)](https://travis-ci.org/luv-sic/relax) [](https://coveralls.io/github/luv-sic/relax?branch=master)
[![npm](https://img.shields.io/badge/TypeScript-%E2%9C%93-007ACC.svg)](https://www.typescriptlang.org/) [![GitHub license](https://img.shields.io/github/license/luv-sic/relax.svg)](https://github.com/luv-sic/relax/blob/master/LICENSE)

> A React state management library Based on Hooks, it begins as a fork of [stamen](https://github.com/forsigner/stamen).

## Feature

Relax is opinionated, it has the these benefits.

* Simplified API, like Vuex
* Typescript friendly
* No boilerplate code, no `createAction`
* Hooks based, no `Provider、connect、mapState`
* Multiple store/module

## Installation

```sh
yarn add relax-ts
```

## Quick Start

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'relax-ts'

const { useSelector, dispatch } = createStore({
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
    async asyncIncrement() {
      await new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      dispatch('increment')
    },
  },
})

const App = () => {
  const count = useSelector(S => S.count)
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

- [Basic](https://github.com/luv-sic/relax/tree/master/examples/basic) - Most basic usage
- [Async](https://github.com/luv-sic/relax/tree/master/examples/async) - To query data from remote server
- [TodoMVC](https://github.com/luv-sic/relax/tree/master/examples/todomvc) - Relax version TodoMVC
- [Recommended usage](https://github.com/luv-sic/relax/tree/master/examples/recommended-usage) - Recommended practice with Relax

## Guide

Relax is simple, only two step to setup it.

Step 1: creat a store

```js
const counterStore = createStore({
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
  const { useSelector, dispatch } = counterStore
  const count = useSelector(S => S.count)
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
const someStore = createStore({
  state: {},
  reducers: {},
  affects: {},
})

const { useSelector, dispatch } = someStore
```

### state

The initial state of a Store.

```js
const someStore = createStore({
  state: {
    count: 0,
  },
})
```

### reducers

Two type action in Relax: reducers and effects, you can update state in reducers only.

```js
const someStore = createStore({
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
const someStore = createStore({
  effects: {
    async asyncIncrement() {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      someStore.dispatch('increment')
    },
  },
})
```

### useSelector

Get state in view using react hooks api.

```js
const App = () => {
  const { useSelector } = counterStore
  const count = useSelector(S => S.count)
  return <span>{count}</span>
}
```

### dispatch

Dispatch an Action to update state.

```js
const App = () => {
  const { useSelector, dispatch } = counterStore
  const count = useStore(S => S.count)
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch('decrement')}>-</button>
      <button onClick={() => dispatch('increment')}>+</button>
    </div>
  )
}
```

## License

[MIT License](https://github.com/luv-sic/relax/blob/master/LICENSE)
