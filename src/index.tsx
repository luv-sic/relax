import * as React from 'react'
import produce from 'immer'
import { ConsumerProps, MutateFn, Updater } from './typings'
export { createStore, ConsumerProps }

function createStore<T = any>(state: T) {
  const updaters: Array<Updater<T>> = []
  let nextState: any = state
  const Consumer = class extends React.Component<ConsumerProps<T>> {
    state: T = state
    componentDidMount() {
      updaters.push(this.update)
    }
    update = (fn: MutateFn<T>) => {
      this.setState(currentState => {
        nextState = produce(currentState, (draft: T) => {
          fn(draft)
        })
        return nextState
      })
    }
    componentWillUnmount() {
      const index = updaters.indexOf(this.update)
      updaters.splice(index, 1)
    }
    render() {
      return this.props.children(this.state)
    }
  }

  return {
    consume<S>(
      selector: (state: T) => S,
      renderFn?: (partialState: S) => React.ReactNode,
    ) {
      if (!renderFn) {
        return <Consumer>{selector}</Consumer>
      }
      return (
        <Consumer selected={selector(state)}>
          {(store: T) => renderFn(selector(store))}
        </Consumer>
      )
    },
    mutate(fn: MutateFn<T>): void {
      updaters.forEach(update => update(fn))
    },
    getState: (): T | any => nextState,
  }
}
