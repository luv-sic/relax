import { useState } from 'react'
import crossfetch from 'cross-fetch'

import produce from 'immer'
// import equal from 'fast-deep-equal'

import { GraphQLClient } from 'gery'
import { useMount, useUnmount, getActionName } from './util'
import {
  Opt,
  Reducers,
  Effects,
  Selector,
  ReducerFn,
  ActionSelector,
  Updater,
  Result,
  Variables,
  Config,
} from './typings'

let config: Config = {
  rest: {
    endpoint: '',
  },
  graphql: {
    endpoint: '',
    headers: {},
  },
}

const stamen = {
  init: (initConfig: Config) => {
    config = initConfig
  },
}

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

  function mutate(result: Result<any>, stateKey: string) {
    const { loading, data, error } = result
    updaters.forEach(updater => {
      const nextState: S = produce<any>(storeState, (draft: any) => {
        draft[stateKey] = { loading, data, error }
      })

      updater.set(() => {
        storeState = nextState
        return nextState
      })
    })
  }

  function updateStore(stateKey: string, loading: boolean, data?: any, error?: any) {
    mutate({ loading, data, error }, stateKey)
  }

  async function fetch(url: string, options?: any) {
    const { stateKey } = options || ({} as any)
    const { endpoint } = config.rest
    const key = stateKey || url

    updateStore(key, true)

    try {
      const res: any = await crossfetch(endpoint + url)
      if (res.status >= 400) {
        throw new Error('Bad response from server')
      }
      const data = await res.json()

      updateStore(key, false, data)
      return data
    } catch (error) {
      updateStore(key, false, undefined, error)
      console.log('error:', error)

      throw error
    }
  }

  async function query(gqlStr: string, variables?: Variables, options?: any) {
    const { stateKey } = options || ({} as any)
    const { endpoint, headers } = config.graphql
    const client = new GraphQLClient({ endpoint, headers })
    const key = stateKey || gqlStr

    updateStore(key, true)

    try {
      const data = await client.query(gqlStr, variables)
      updateStore(key, false, data)
      return data
    } catch (error) {
      updateStore(key, false, undefined, error)
      console.log('error:', error)

      throw error
    }
  }

  function getState(): S {
    return storeState
  }

  return { useStore, dispatch, fetch, query, getState }
}

export default stamen
export { createStore, Result }
