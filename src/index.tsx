import * as React from 'react'
import produce from 'immer'

export interface ConsumerProps<T> {
  children: (store: T) => React.ReactNode
}

export type mutateFn<T> = (draft: T) => void
type Updater<T> = (fn: mutateFn<T>) => void

export { createStore }

function createStore<T = any>(state: T) {
  const updaters: Array<Updater<T>> = []
  let nextState: any
  const Consumer = class extends React.Component<ConsumerProps<T>> {
    state: T = state
    componentDidMount() {
      updaters.push(this.update)
    }
    update = (fn: mutateFn<T>) => {
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
  const mutate = (fn: mutateFn<T>): void => {
    updaters.forEach(update => update(fn))
  }
  const getState: T | any = () => (nextState ? nextState : state)
  return {
    Consumer,
    mutate,
    getState,
  }
}
