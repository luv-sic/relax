import { useState, useEffect } from 'react'
import produce from 'immer'
import equal from 'fast-deep-equal'
import { Opt, Reducers, Effects, Selector, ReducerFn, ActionSelector, Updater } from './typings'

export { createStore }

function createStore<S, R extends Reducers<S>, E extends Effects>(opt: Opt<S, R, E>) {
  let initialState: any = opt.state
  const updaters: Array<Updater<S>> = []

  function effectDispatchFactory() {
    return function put(actionName: string, payload: any) {
      if (!updaters.length) return
      updaters.forEach(updater => {
        if (opt.reducers) {
          updater.update(updater.set, opt.reducers[actionName], payload)
        }
      })
    }
  }

  function useStore() {
    function get<P>(selector: Selector<S, P>) {
      const [state, setState] = useState(initialState)
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

        const nextState: S = produce<any>(initialState, (draft: S) => {
          action(draft, payload)
        })

        if (equal(selector(initialState), selector(nextState))) {
          return
        }

        set(() => {
          initialState = nextState
          return nextState
        })
      }

      return selector(state)
    }

    function dispatch(action: keyof (R & E) | ActionSelector<R, E>, payload?: any) {
      const actionName = getActionName(action)
      if (opt.effects && opt.effects[actionName]) {
        opt.effects[actionName](effectDispatchFactory(), payload)
        return
      }
      if (!updaters.length) return

      updaters.forEach(updater => {
        if (opt.reducers) {
          updater.update(updater.set, opt.reducers[actionName], payload)
        }
      })
    }

    return { get, dispatch }
  }

  return { useStore }
}

function useMount(mount: any): void {
  useEffect(mount, [])
}

const useUnmount = (unmount: any) => {
  useEffect(
    () => () => {
      if (unmount) unmount()
    },
    [],
  )
}

function getActionName(action: any): string {
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
