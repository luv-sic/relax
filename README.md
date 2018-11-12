<img src="http://forsigner.com/images/stamen-logo.jpg" height="200px" align="right"/>

# Stamen

[![npm](https://img.shields.io/npm/v/stamen.svg)](https://www.npmjs.com/package/stamen) [![Build Status](https://travis-ci.org/forsigner/stamen.svg?branch=master)](https://travis-ci.org/forsigner/stamen) [![Coverage Status](https://coveralls.io/repos/github/forsigner/stamen/badge.svg?branch=master)](https://coveralls.io/github/forsigner/stamen?branch=master)
[![npm](https://img.shields.io/badge/TypeScript-%E2%9C%93-007ACC.svg)](https://www.typescriptlang.org/) [![GitHub license](https://img.shields.io/github/license/forsigner/stamen.svg)](https://github.com/forsigner/stamen/blob/master/LICENSE)

> A React state management library Based on Hooks

## Installation

```sh
yarn add stamen
```

## Documentation

[English](http://forsigner.com/stamen/#/) | [简体中文](http://forsigner.com/stamen-zh-cn/#/)

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

### Examples

- [Basic](https://github.com/forsigner/stamen/tree/master/examples/basic) - Most basic usage
- [Async](https://github.com/forsigner/stamen/tree/master/examples/async) - To query data from remote server
- [TodoMVC](https://github.com/forsigner/stamen/tree/master/examples/todomvc) - stamen version TodoMVC
- [Recommended usage](https://github.com/forsigner/stamen/tree/master/examples/recommended-usage) - Recommended practice with stamen


## FAQ

**Support Typescript?**

Yes, it is total type-safety. Perfect with Typescript.


**Single store or Multiple store?**

Personally, I would recommend a multi-part solution. More flexible and less Potential performance issues.

## License

[MIT License](https://github.com/forsigner/stamen/blob/master/LICENSE)
