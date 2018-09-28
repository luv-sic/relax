import * as React from 'react'
import produce from 'immer'

export interface ConsumerProps<T> {
  children: (store: T) => React.ReactNode
}

export type mutateFn<T> = (draft: T) => void
type Updater<T> = (fn: mutateFn<T>) => void

export { createStore }

function createStore<T>(initialState: T) {
  const updaters: Array<Updater<T>> = []

  const Consumer = class extends React.Component<ConsumerProps<T>> {
    state: T
    constructor(props: ConsumerProps<T>) {
      super(props)
      this.state = initialState
    }
    componentDidMount() {
      updaters.push(this.update)
    }
    update = (fn: mutateFn<T>) => {
      this.setState(state => {
        const nextState = produce(state, (draft: T) => {
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

  function mutate(fn: mutateFn<T>): void {
    updaters.forEach(update => update(fn))
  }
  return {
    Consumer,
    mutate,
  }
}
