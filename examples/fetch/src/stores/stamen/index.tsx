import { useState, useEffect } from 'react'
import { request } from 'graphql-request'
import crossFetch from 'cross-fetch'

import produce from 'immer'
import equal from 'fast-deep-equal'
import {
  Opt,
  Reducers,
  Effects,
  Selector,
  ReducerFn,
  ActionSelector,
  Updater,
  Result,
} from './typings'

export { createStore, Result }

interface FetchParams {
  url: string
  stateKey: string
  type?: string
}

interface QueryParams {
  query: string
  stateKey: string
  variable?: object
}

function createStore<S, R extends Reducers<S>, E extends Effects>(opt: Opt<S, R, E>) {
  let storeState: S = opt.state
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

        if (equal(selector(storeState), selector(nextState))) {
          return
        }

        set(() => {
          storeState = nextState
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

    function setData(result: Result<any>, stateKey: string) {
      const { loading, data, error } = result
      updaters.forEach(updater => {
        const nextState: S = produce<any>(storeState, (draft: S) => {
          draft[stateKey] = { loading, data, error }
        })

        updater.set(() => {
          storeState = nextState
          return nextState
        })
      })
    }

    function fetch(params: FetchParams) {
      const { url, stateKey } = params

        // init
      ;(async () => {
        await ajax()
      })()

      async function ajax() {
        setData(
          {
            loading: true,
            data: null,
            error: null,
          },
          stateKey,
        )
        try {
          const res = await crossFetch(url)
          const data = await res.json()
          setData(
            {
              loading: false,
              data,
              error: null,
            },
            stateKey,
          )

          console.log('data:', data)
        } catch (err) {
          console.error(err)
        }
      }
    }

    function query(params: QueryParams) {
      const { query: querySchema, stateKey } = params
      const endPoint = 'https://api.graph.cool/simple/v1/movies'

      setData(
        {
          loading: true,
          data: null,
          error: null,
        },
        stateKey,
      )
      request(endPoint, querySchema).then(data => {
        console.log('data:', data)
        setData(
          {
            loading: false,
            data,
            error: null,
          },
          stateKey,
        )
      })
    }

    return { get, dispatch, fetch, query }
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
