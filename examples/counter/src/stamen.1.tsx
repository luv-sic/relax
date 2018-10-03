import * as React from 'react'
import produce from 'immer'
// import equal from 'fast-deep-equal'
import { ConsumerProps, MutateFn } from './typings'
export { Store, ConsumerProps }

// type MutateFn = (state: State) => void

// interface ExportedStore<T> {
//   actions: T
//   [key: string]: any
// }

// type Fn = () => any

// type InitActionsFn<T, S> = (fn: MutateFn) => T

class Store<S, T> {
  state: any
  init: any
  initActions: any
  actions: T
  mutate: (fn: MutateFn<S>) => any
  update: (fn: any) => void
  consume: any

  constructor(name: string, state: S, actions: T) {
    let hstate: any = state
    const storeName = name
    console.log('storeName:', storeName)

    let update: (fn: MutateFn<S>) => void

    const Box = class extends React.Component<{ children: (s: any) => React.ReactNode }> {
      state: any = hstate

      update = (fn: any) =>
        this.setState(prevState => (hstate = produce(prevState, (draft: S) => void fn(draft))))

      componentDidMount = () => (update = this.update)
      render = () => this.props.children(this.state)
    }

    function mutate(fn: MutateFn<S>) {
      if (update) return update(fn)
      const next = produce(state, (draft: any) => {
        fn(draft)
      })
      state = next
    }

    this.actions = actions
    this.mutate = mutate
    this.consume = (selector: any) => {
      return <Box>{selector}</Box>
    }
  }
}
