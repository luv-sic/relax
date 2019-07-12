import { useState } from 'react'
import equal from 'fast-deep-equal'

import produce from 'immer'
import { useMount, useUnmount, getActionName } from './util'
import {
  Opt,
  Reducers,
  ReducerFn,
  Effects,
  StateSelector,
  ActionSelector,
  Updater,
} from './typings'

function createStore<S, R extends Reducers<S>, E extends Effects>(opt: Opt<S, R, E>) {
  let storeState: S = opt.state
  const updaters: Array<Updater<S>> = []

  function useStore<P>(selector: StateSelector<S, P>) {
    const [state, setState] = useState(storeState)

    const update: any = (set: any, action: ReducerFn<S>, payload: any) => {
      let result: any
      if (!action) return null

      const nextState: S = produce<any>(storeState, (draft: S) => {
        result = action(draft, payload)
      })

      // TODO: prevent re-render
      if (equal(selector(storeState), selector(nextState))) {
        return result
      }

      storeState = nextState

      set(() => nextState)
      return result
    }

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

    return selector(state)
  }

  async function dispatch<K extends any>(
    action: keyof (R & E) | ActionSelector<R, E>,
    payload?: K,
  ) {
    let result: any
    const actionName = getActionName(action)
    if (opt.effects && opt.effects[actionName]) {
      result = await opt.effects[actionName](payload)
      return result
    }
    if (!updaters.length) return

    updaters.forEach(updater => {
      if (opt.reducers) {
        result = updater.update(updater.set, opt.reducers[actionName], payload)
      }
    })
    return result
  }

  function getState(): S {
    return storeState
  }

  return { useStore, dispatch, getState }
}

export { createStore }
export * from './typings'
