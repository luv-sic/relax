import { useState } from 'react'

import produce from 'immer'
// import equal from 'fast-deep-equal'

import { useMount, useUnmount, getActionName } from './util'
import { Opt, Reducers, Effects, Selector, ReducerFn, ActionSelector, Updater } from './typings'

function createStore<S, R extends Reducers<S>, E extends Effects>(opt: Opt<S, R, E>) {
  let storeState: S = opt.state
  const updaters: Array<Updater<S>> = []

  function useStore<P>(selector: Selector<S, P>) {
    const [state, setState] = useState(storeState)
    const updater = {
      update,
      set: setState,
    }

    useMount(() => {
      updaters.push(updater)
    })

    useUnmount(() => {
      updaters.splice(updaters.indexOf(updater), 1)
    })

    function update(set: any, action: ReducerFn<S>, payload: any): any {
      if (!action) return null

      const nextState: S = produce<any>(storeState, (draft: S) => {
        action(draft, payload)
      })

      // TODO: prevent re-render
      // if (equal(selector(storeState), selector(nextState))) return

      storeState = nextState

      set(() => nextState)
    }

    return selector(state)
  }

  function dispatch<K extends any>(action: keyof (R & E) | ActionSelector<R, E>, payload?: K) {
    const actionName = getActionName(action)
    if (opt.effects && opt.effects[actionName]) {
      return opt.effects[actionName](payload)
    }
    if (!updaters.length) return

    updaters.forEach(updater => {
      if (opt.reducers) {
        updater.update(updater.set, opt.reducers[actionName], payload)
      }
    })
  }

  function getState(): S {
    return storeState
  }

  return { useStore, dispatch, fetch, getState }
}

export { createStore }
export * from './typings'
