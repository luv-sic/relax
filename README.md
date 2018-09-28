# Stamen

> A sexy state container for React

- **Lightweight** ~650B after gzip, no dependences
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

## Basic Usage

```js
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'stamen'

const { Consumer, mutate } = createStore({ count: 1 })

const App = () => (
  <div>
    <Consumer>{state => <span>{state.count}</span>}</Consumer>
    <button onClick={() => mutate(d => d.count--)}>-</button>
    <button onClick={() => mutate(d => d.count++)}>+</button>
  </div>
)

render(<App />, document.getElementById('root'))
```

### Examples on CodeSandbox

[Basic](https://codesandbox.io/s/0vrrlkjx5w) · [Use Hoc](https://codesandbox.io/s/0vrrlkjx5w) · [Async](https://codesandbox.io/s/0vrrlkjx5w)

## API

- createStore
  - Consumer
  - mutate

Create a store, use `Consumer` render state, use `mutate` method to update state. 

A Store recommended in Real world:

```js
import { createStore } from 'stamen'

const { Consumer, mutate } = createStore({
  count: 1,
})

export function increment() {
  mutate(draft => {
    draft.count++
  })
}

export function decrement() {
  mutate(draft => {
    draft.count--
  })
}

export { Consumer, mutate }
```