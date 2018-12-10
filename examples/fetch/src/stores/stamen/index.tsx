import { useState } from 'react'

import produce from 'immer'
import equal from 'fast-deep-equal'

import { GraphQLClient } from 'gery'
import { useMount, useUnmount, getActionName } from './util'
import {
  Opt,
  Graphqls,
  Reducers,
  Effects,
  Selector,
  ReducerFn,
  ActionSelector,
  Updater,
  Result,
  QueryParams,
  Config,
} from './typings'

let config: Config = {
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

function createStore<S, G extends Graphqls, R extends Reducers<S>, E extends Effects>(
  opt: Opt<S, G, R, E>,
) {
  let storeState: S = opt.state
  const updaters: Array<Updater<S>> = []

  let graphqls: G
  if (opt.graphqls) {
    graphqls = opt.graphqls
  }

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

      // prevent re-render
      if (equal(selector(storeState), selector(nextState))) return

      set(() => {
        storeState = nextState
        return nextState
      })
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
      const nextState: S = produce<any>(storeState, (draft: S) => {
        draft[stateKey] = { loading, data, error }
      })

      updater.set(() => {
        storeState = nextState
        return nextState
      })
    })
  }

  function updateQueryStatus(stateKey: string, loading: boolean, data?: any, error?: any) {
    mutate({ loading, data, error }, stateKey)
  }

  async function query(graphqlSelector: (graphqls: G) => any, params: QueryParams) {
    const { stateKey, variables } = params
    const { endpoint, headers } = config.graphql
    const client = new GraphQLClient({ endpoint, headers })
    const key = stateKey || 'TODO' // TODO: 默认值

    updateQueryStatus(key, true)

    try {
      const data = await client.query(graphqlSelector(graphqls), variables)
      updateQueryStatus(key, false, data)
      return data
    } catch (error) {
      updateQueryStatus(key, false, undefined, error)

      throw new Error(error) // TODO: message
    }
  }

  return { useStore, dispatch, query }
}

export default stamen
export { createStore, Result }
