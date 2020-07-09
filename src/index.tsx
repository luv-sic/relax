import React, { useState, useEffect, createContext, FC, ReactNode } from 'react'
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
  const subscribers: Array<Subscriber<S>> = []
  const StoreContext = createContext<S>(model.state)
  let storeState = model.state

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
      return () => {
        const index = subscribers.indexOf(subscriber)
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
        notify(storeState, nextState)
        storeState = nextState
      }
      return result
    }
    return
  }

  function notify(oldState: S, nextState: S) {
    subscribers.forEach(subscriber => {
      subscriber(oldState, nextState)
    })
  }

  const EnhancedProvider: FC<{
    initialState?: S
    children: ReactNode
  }> = ({ initialState, children }) => {
    // useEffect to prevent update Provider's child component while rendering Provider
    useEffect(() => {
      if (initialState) {
        notify(storeState, initialState)
        storeState = initialState
      }
    }, [initialState])
    return <StoreContext.Provider value={initialState as S}>{children}</StoreContext.Provider>
  }

  return { useSelector, dispatch, getState, Provider: EnhancedProvider }
}

export { createStore }
export * from './typings'
