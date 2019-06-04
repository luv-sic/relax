import { useState, Dispatch, SetStateAction } from 'react'

import produce from 'immer'
import { useMount, useUnmount, getActionName } from './util'
import { Opt, Reducers, Effects, Selector, ActionSelector } from './typings'

function createStore<S, R extends Reducers<S>, E extends Effects>(opt: Opt<S, R, E>) {
  let storeState: S = opt.state
  const updaters: Dispatch<SetStateAction<S>>[] = []

  function useStore<P>(selector: Selector<S, P>) {
    const [state, setState] = useState(storeState)
    useMount(() => {
      updaters.push(setState)
    })

    useUnmount(() => {
      updaters.splice(updaters.indexOf(setState), 1)
    })

    return selector(state)
  }

  function dispatch<K extends any>(action: keyof (R & E) | ActionSelector<R, E>, payload?: K) {
    const actionName = getActionName(action)
    if (opt.effects && opt.effects[actionName]) {
      return opt.effects[actionName](payload)
    }
    if (!updaters.length) return

    if (opt.reducers && opt.reducers[actionName]) {
      const action = opt.reducers[actionName]
      if (!action) return null

      const nextState: S = produce<any>(storeState, (draft: S) => {
        action(draft, payload)
      })
      storeState = nextState
      updaters.forEach(setState => {
        setState(nextState)
      })
    }
  }

  function getState(): S {
    return storeState
  }

  return { useStore, dispatch, getState }
}

export { createStore }
export * from './typings'
