import * as React from 'react'
import produce from 'immer'
// import equal from 'fast-deep-equal'
import { ConsumerProps } from './typings'
export { createStore, ConsumerProps }

type ActionFn<S> = (state: S, payload: any) => any

interface Reducers<S> {
  [key: string]: (state: S, payload: any) => any
}

interface Effects<S> {
  [key: string]: (payload: any) => any
}

interface Opt<S, R, E> {
  name: string
  state: S
  reducers: R & Reducers<S>
  effects: E & Effects<S>
}

function createStore<S, R = any, E = any>(opt: Opt<S, R, E>) {
  let state: any = opt.state
  // const updaters: Array<(fn: MutateFn<S>, payload: any) => void> = []
  const updaters: Array<(fn: ActionFn<S>, payload: any) => void> = []

  // const mutate = (fn: MutateFn<S>) => {
  //   console.log('this:', this)
  //   if (updaters.length) return updaters.forEach(updater => updater(fn))

  //   const next = produce(state, (draft: any) => {
  //     fn(draft)
  //   })
  //   state = next
  // }

  const Box = class extends React.Component<ConsumerProps<S>> {
    state: S = state
    update = (fn: ActionFn<S>, payload: any): any => {
      console.log('.------------------')
      if (!fn) return null
      this.setState(prevState => {
        const next = produce(prevState, (draft: S) => {
          fn(draft, payload)
        })
        state = next
        return next
      })
    }
    shouldComponentUpdate() {
      return true
    }
    componentDidMount = () => updaters.push(this.update)
    render = () => {
      return this.props.children(this.state)
    }
  }

  return {
    getState: () => state,
    consume<P>(selector: (state: S) => P, renderFn?: (partialState: P) => React.ReactNode) {
      if (!renderFn) return <Box>{selector}</Box>
      return <Box selector={selector}>{(s: S) => renderFn(selector(s))}</Box>
    },
    dispatch(action: string, payload?: any) {
      if (updaters.length) {
        // TODO:
        const fn = opt.reducers[action] || opt.effects[action]
        // if (opt.effects[action]) return
        return updaters.forEach(updater => updater(fn, payload))
      }
    },
  }
}
