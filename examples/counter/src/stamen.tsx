import * as React from 'react'
import produce from 'immer'
import * as equal from 'fast-deep-equal'
import {
  ConsumerProps,
  Updater,
  Opt,
  Reducers,
  Effects,
  RenderFn,
  Selector,
  reducerFn,
  Callback,
  Params,
  ActionSelector,
} from './typings'
export { createStore, ConsumerProps }

function createStore<S, R extends Reducers<S>, E extends Effects>(opt: Opt<S, R, E>) {
  const storeName = opt.name
  let state: S = opt.state
  const updaters: Array<Updater<S>> = []

  class Box extends React.Component<ConsumerProps<S>> {
    state: S = state
    update = (action: reducerFn<S>, payload: any, cb: Callback): any => {
      if (!action) return null
      this.setState(prevState => {
        const nextState: S = produce<any>(prevState, (draft: S) => {
          action(draft, payload)
        })

        state = nextState
        cb(prevState, nextState)
        return nextState
      })
    }
    shouldComponentUpdate = (_: ConsumerProps<S>, nextState: S) => {
      const selector = this.props.selector ? this.props.selector : (s: S) => s
      return !equal(selector(this.state), selector(nextState))
    }
    componentDidMount = () => updaters.push(this.update)
    render = () => this.props.children(this.state)
  }

  function consume<P>(selector: Selector<S, P>, renderFn?: RenderFn<P>) {
    if (!renderFn) return <Box>{selector}</Box>
    return <Box selector={selector}>{(s: S) => renderFn(selector(s))}</Box>
  }

  function putFactory(payload: any) {
    return function put(actionName: string) {
      if (!updaters.length) return
      updaters.forEach((updater, i) => {
        updater(opt.reducers[actionName], payload, (prev: any, next: any) => {
          if (i + 1 !== updaters.length) return
          onStateChange<S>({
            storeName,
            actionName,
            payload,
            prevState: prev,
            nextState: next,
          })
        })
      })
    }
  }

  function dispatch(action: keyof (R & E) | ActionSelector<R, E>, payload?: any) {
    const actionName = getActoinName(action)

    if (opt.effects[actionName]) {
      opt.effects[actionName](putFactory(payload))
      return
    }

    if (!updaters.length) return
    updaters.forEach((updater, i) => {
      updater(opt.reducers[actionName], payload, (prev: any, next: any) => {
        if (i + 1 !== updaters.length) return
        onStateChange<S>({
          storeName,
          actionName,
          payload,
          prevState: prev,
          nextState: next,
        })
      })
    })
  }

  return {
    consume,
    dispatch,
    getState: () => state,
  }
}

function getActoinName(action: any): string {
  if (typeof action === 'string') return action

  try {
    const str = action.toString()
    const regAction = /return.*\.(.*);/
    const arr: any = str.match(regAction) || []
    return arr[1]
  } catch {
    throw new Error('action type or selector invalid')
  }
}

function onStateChange<S>(params: Params<S>) {
  const { storeName, actionName, payload, prevState, nextState } = params
  console.log(`[${storeName}] action:${actionName}, payload:${payload}`)
  console.log('prevState:', prevState)
  console.log('nextState:', nextState)
}
