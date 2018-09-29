# Stamen


[![npm](https://img.shields.io/npm/v/stamen.svg)](https://www.npmjs.com/package/stamen) [![install size](https://packagephobia.now.sh/badge?p=stamen)](https://packagephobia.now.sh/result?p=stamen) [![Build Status](https://travis-ci.org/forsigner/stamen.svg?branch=master)](https://travis-ci.org/forsigner/stamen) [![Coverage Status](https://coveralls.io/repos/github/forsigner/stamen/badge.svg?branch=master)](https://coveralls.io/github/forsigner/stamen?branch=master) 
[![npm](https://img.shields.io/badge/TypeScript-%E2%9C%93-007ACC.svg)](https://www.typescriptlang.org/) [![GitHub license](https://img.shields.io/github/license/forsigner/stamen.svg)](https://github.com/forsigner/stamen/blob/master/LICENSE)


> A sexy state container for React

- **Lightweight** less 700B after gzip, no dependences
- **Minimalist** zero boilerplate, minimal api
- **Intuitive** no complex concept, just state and action
- **Clear** Easy to write maintainable and readable code

State is an An immutable React state management library, powered by [stamen](https://github.com/forsigner/immersta

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [API](#api)

## Installation

```sh
yarn add stamen
```

## Usage

```js
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'stamen'

const { Consumer, mutate } = createStore({ count: 1 })

const App = () => (
  <div>
    <Consumer>{state => <span>{state.count}</span>}</Consumer>
    <button onClick={() => mutate(state => state.count--)}>-</button>
    <button onClick={() => mutate(state => state.count++)}>+</button>
  </div>
)

render(<App />, document.getElementById('root'))
```

### Examples

Examples on CodeSandbox

- [Basic example](https://codesandbox.io/s/0vrrlkjx5w) 
- [Async example](https://codesandbox.io/s/kmq65p3l97)


## API

> const { [Consumer](#consumer), [mutate](#mutate), [getState](#getState) } =  createStore(initialState)

Create a store instance, use `Consumer` to render state, use `mutate` to update state. We recommend to create multi to in your app.

A store recommended in Real world:

```js
import { createStore } from 'stamen'

const { Consumer, mutate } = createStore({
  count: 1,
})

// an action
export function increment() {
  mutate(state => {
    state.count++
  })
}

export function decrement() {
  mutate(state => {
    state.count--
  })
}

export { Consumer, mutate }
```

Keeping your `state` and `actions` in one file is more better;

### Consumer

 Use `Consumer` to consume state, Component will re-render if state is mutated;

 ```js
<Consumer>{state => <span>{state.count}</span>}</Consumer>
 ```

### mutate

Action is a function which contain `mutate`, you can call it in anywhere, in React lifecycle fn、stateless componet... even out of React component, so you don't need HOC. 

```js
function increment() {
  mutate(state => {
    state.count++
  })
}
```

### getState

Get the current state object.

```js

const { getState } = createStore({ count: 1 })
const currentState = getState()
```

## License

[MIT License](https://github.com/forsigner/stamen/blob/master/LICENSE)
