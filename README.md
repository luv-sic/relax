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
import { createState } from 'stamen'

const { Consumer, mutate } = createState({ count: 1 })

const App = () => (
  <Consumer>
    {state => (
      <div>
        <h3>{state.count}</h3>
        <button onClick={() => mutate(d => d.count--)}>-</button>
        <button onClick={() => mutate(d => d.count++)}>+</button>
      </div>
    )}
  </Consumer>
)

render(<App />, document.getElementById('root'))
```

### Examples on CodeSandbox

[Basic](https://codesandbox.io/s/0vrrlkjx5w) · [Use Hoc](https://codesandbox.io/s/0vrrlkjx5w) · [Async](https://codesandbox.io/s/0vrrlkjx5w)

## API

- createState
  - Consumer
  - mutate

Create a store, use `Consumer` render state, use `mutate` method to update state. 

A Store recommended in Real world:

```js
import { createState } from 'stamen'

const { Consumer, consume, mutate } = createState({
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

export { Consumer, consume, mutate }
```