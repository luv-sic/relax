# Stamen

[![npm](https://img.shields.io/npm/v/stamen.svg)](https://www.npmjs.com/package/stamen) ![gzip size](https://img.shields.io/badge/gzip%20size-638%20B-44cc11.svg) [![Coverage Status](https://coveralls.io/repos/github/forsigner/stamen/badge.svg?branch=master)](https://coveralls.io/github/forsigner/stamen?branch=master)
[![npm](https://img.shields.io/badge/TypeScript-%E2%9C%93-007ACC.svg)](https://www.typescriptlang.org/) [![GitHub license](https://img.shields.io/github/license/forsigner/stamen.svg)](https://github.com/forsigner/stamen/blob/master/LICENSE)

> A sexy state container for React

Stamen is an An immutable React state management library.

If you're like me, tire of
provider, connections, actions, reducers, effects, dispatch, put, call, preload, @observable, @computed, @observer, @inject...

If you dont't like a lot of boilerplate, concepts, principles, APIs...

If you just want to get off work early.

You can try `stamen`.

## Why ?

- **Lightweight** less 700B after gzip, no dependences
- **Minimalist** zero boilerplate, minimal api
- **Intuitive** no complex concept, just state and action
- **Clear** Easy to write maintainable and readable code
- **Efficient** High development efficiency, It's important
- **Sexy** Let you to meet your girlfriend earlier

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

const { consume, mutate } = createStore({ count: 1 })

const App = () => (
  <div>
    <span>{consume(state => state.count)}</span>
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

> const { [consume](#consume), [mutate](#mutate), [getState](#getState) } = createStore(initialState)

Create a store instance, use `consume` to access state, use `mutate` to update state. We recommend to create multiple store in your app.

A store recommended in Real world:

```js
import { createStore } from 'stamen'

const { consume, mutate } = createStore({
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

export { consume, mutate }
```

Keeping your `state` and `actions` in one file is more better;

### `consume()`

consume state in Component, Component will re-render if state is mutated;

```js
<span>{consume(state => state.count)}</span>
```

### `mutate()`

Action is a plain function which contain `mutate()` in it, you can call it in anywhere, in React lifecycle fn、stateless componet... even out of React component, so you don't need HOC.

State is immutable, but you can generate newState by a mutable API `mutate`, thanks to [immer](https://github.com/mweststrate/immer).

```js
function increment() {
  mutate(state => {
    state.count++
  })
}
```

### `getState()`

Get the current state object.

```js
const { getState } = createStore({ count: 1 })
const currentState = getState()
```

## FAQ

**Compare to Redux and Mobx**

Just another choice...

**Support Typescript?**

Yes, it is total type-safety.

**Single store or Multiple store?**

Personally, I would recommend a multi-part solution. More flexible and less Potential performance issues.

**Can I use HOCs?**

No, You don't need it at all. Maybe you are used to using a HOC(like connect, inject) in Redux or Mobx, to get some state or action method in lifecycles. In Stamen, You can access state by `getState()` and actions in lifecycles directly.

## License

[MIT License](https://github.com/forsigner/stamen/blob/master/LICENSE)
