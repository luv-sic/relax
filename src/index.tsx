import * as React from 'react'
import produce from 'immer'
import equal from 'fast-deep-equal'
import { ConsumerProps, MutateFn } from './typings'
export { createStore, ConsumerProps }

function createStore<T>(initialState: T) {
  let state: any = initialState
  let update: (fn: MutateFn<T>) => void
  const Box = class extends React.Component<ConsumerProps<T>> {
    state: T = state
    update = (fn: MutateFn<T>) =>
      this.setState(prevState => (state = produce(prevState, (draft: T) => void fn(draft))))
    shouldComponentUpdate = (_: ConsumerProps<T>, nextState: T) => {
      const selector = this.props.selector ? this.props.selector : (s: T) => s
      return !equal(selector(this.state), selector(nextState))
    }
    componentDidMount = () => (update = this.update)
    render = () => this.props.children(this.state)
  }
  return {
    consume<P>(selector: (state: T) => P, renderFn?: (partialState: P) => React.ReactNode) {
      if (!renderFn) return <Box>{selector}</Box>
      return <Box selector={selector}>{(s: T) => renderFn(selector(s))}</Box>
    },
    mutate: (fn: MutateFn<T>): void =>
      update ? update(fn) : (state = produce(state, (draft: T) => void fn(draft))),
    getState: (): T => state,
  }
}
