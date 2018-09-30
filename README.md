<img src="http://forsigner.com/images/stamen-logo.jpg" height="200px" align="right"/>

# Stamen

[![npm](https://img.shields.io/npm/v/stamen.svg)](https://www.npmjs.com/package/stamen) ![gzip size](https://img.shields.io/badge/gzip%20size-638%20B-44cc11.svg) [![Build Status](https://travis-ci.org/forsigner/stamen.svg?branch=master)](https://travis-ci.org/forsigner/stamen) [![Coverage Status](https://coveralls.io/repos/github/forsigner/stamen/badge.svg?branch=master)](https://coveralls.io/github/forsigner/stamen?branch=master)
[![npm](https://img.shields.io/badge/TypeScript-%E2%9C%93-007ACC.svg)](https://www.typescriptlang.org/) [![GitHub license](https://img.shields.io/github/license/forsigner/stamen.svg)](https://github.com/forsigner/stamen/blob/master/LICENSE)

> A sexy state container for React

Stamen is an An immutable react state management library.

## Hey~

If you're like me, tire of
provider, connections, actions, reducers, effects, dispatch, put, call, payload, @observable, @computed, @observer, @inject...

If you dont't like a lot of boilerplate, concepts, principles, APIs...

If you just want to get off work early.

You can try `stamen`.

## Why?

- **Lightweight** less 700B after gzip, 40 lines code only
- **Minimalist** zero boilerplate, minimal api
- **Intuitive** no complex concept, just state and action
- **Clear** Easy to write maintainable and readable code
- **Efficient** High development efficiency, It's important
- **Typescript** Perfect intellisense with state and action
- **Sexy** Let you to meet your girlfriend earlier


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

Check on CodeSandbox: [Basic](https://codesandbox.io/s/0vrrlkjx5w) | [Async](https://codesandbox.io/s/kmq65p3l97)


### Examples

- [Basic](https://github.com/forsigner/stamen/tree/master/examples/basic) - Most basic usage
- [Async](https://github.com/forsigner/stamen/tree/master/examples/async) - To query data from remote server
- [TodoMVC](https://github.com/forsigner/stamen/tree/master/examples/todomvc)  - stamen version TodoMVC
- [Recommended usage](https://github.com/forsigner/stamen/tree/master/examples/recommended-usage) - Recommended practice with stamen


## API

> const { [consume](#consume), [mutate](#mutate), [getState](#getstate) } = createStore(initialState)

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

First, you need create a store, example:

```js
const { consume, mutate } = createStore({
  count: 1,
  info: {
    name: 'Counter',
  },
})
```

**Simple usage**

```js
<span>{consume(state => state.count)}</span>
```

**Using selectors**

```js
<span>{consume(state => state.info.name, name => name)}</span>
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

Yes, it is total type-safety. Perfect with Typescript.

key typings:

```js
declare function createStore<T>(
  state: T,
): {
  consume<S>(
    selector: (state: T) => S,
    renderFn?: (partialState: S) => React.ReactNode,
  ): JSX.Element,
  mutate: (fn: (draft: T) => void) => void,
  getState: () => T,
}
```

**Single store or Multiple store?**

Personally, I would recommend a multi-part solution. More flexible and less Potential performance issues.

**Can I use HOCs?**

No, You don't need it at all. Maybe you are used to using a HOC(like connect, inject) in Redux or Mobx, to get some state or action method in lifecycles. In Stamen, You can access state by `getState()` and actions in lifecycles directly.

## License

[MIT License](https://github.com/forsigner/stamen/blob/master/LICENSE)
