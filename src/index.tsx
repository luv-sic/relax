import * as React from 'react'
import produce from 'immer'
import equal from 'fast-deep-equal'
import { ConsumerProps, MutateFn } from './typings'
export { createStore, ConsumerProps }

function createStore<T>(initialState: T) {
  const updaters: Array<(fn: MutateFn<T>) => void> = []
  let state: any = initialState
  const Box = class extends React.Component<ConsumerProps<T>> {
    state: T = initialState
    update = (fn: MutateFn<T>) => this.setState(prevState => (state = produce(prevState, (draft: T) => void fn(draft))))
    shouldComponentUpdate = (_: ConsumerProps<T>, nextState: T) => {
      const selector = this.props.selector ? this.props.selector : (s: T) => s
      return !equal(selector(this.state), selector(nextState))
    }
    componentDidMount = () => updaters.push(this.update)
    componentWillUnmount = () => updaters.splice(updaters.indexOf(this.update), 1)
    render = () => this.props.children(this.state)
  }
  return {
    consume<P>(selector: (state: T) => P, renderFn?: (partialState: P) => React.ReactNode) {
      if (!renderFn) return <Box>{selector}</Box>
      return <Box selector={selector}>{(s: T) => renderFn(selector(s))}</Box>
    },
    mutate: (fn: MutateFn<T>): void => updaters.forEach(update => update(fn)),
    getState: (): T => state,
  }
}
