import { useState, useEffect } from 'react'
import equal from 'fast-deep-equal'

import produce from 'immer'
import { getActionName } from './util'
import {
  Model,
  Reducers,
  ReducerFn,
  Effects,
  StateSelector,
  Subscriber,
  ExtractActionFromReducersEffects,
  // ExtractPayloadFromReducersEffects,
} from './typings'

function createStore<S, R extends Reducers<S>, E extends Effects>(model: Model<S, R, E>) {
  let storeState: S = model.state
  const subscribers: Array<Subscriber<S>> = []

  function useSelector<P>(selector: StateSelector<S, P>) {
    const [state, setState] = useState(() => selector(storeState))

    const subscriber: any = (oldState: S, nextState: S) => {
      const shouldUpdate = !equal(selector(oldState), selector(nextState))
      if (shouldUpdate) {
        setState(() => selector(nextState))
      }
    }

    useEffect(() => {
      subscribers.push(subscriber)
      const index = subscribers.indexOf(subscriber)
      return () => {
        subscribers.splice(index, 1)
      }
    }, [])

    return state
  }

  function getState() {
    return storeState
  }

  async function dispatch<A extends ExtractActionFromReducersEffects<R, E>, P = any>(
    action: A,
    payload?: P,
  ) {
    let result: any
    const actionName = getActionName(action)
    if (model.effects && model.effects[actionName]) {
      result = await model.effects[actionName](payload)
      return result
    }
    if (!subscribers.length) return

    if (!action) return null

    if (model.reducers) {
      const reducer: ReducerFn<S> = model.reducers[actionName]
      if (reducer) {
        const nextState: S = produce<S, S>(storeState, (draft: S) => {
          result = reducer(draft, payload)
        })
        const oldState = storeState
        storeState = nextState
        subscribers.forEach(subscriber => {
          subscriber(oldState, nextState)
        })
      }
      return result
    }
    return
  }

  return { useSelector, dispatch, getState }
}

export { createStore }
export * from './typings'
