import React, { useState, useEffect, createContext, FC, ReactNode } from 'react'
import equal from 'fast-deep-equal'
import produce from 'immer'

import { Model, Actions, StateSelector, Subscriber, Dispatch } from './typings'

function createStore<S, A extends Actions<S>>(model: Model<S, A>) {
  const subscribers: Subscriber<S>[] = []
  let storeState = model.state
  const { actions } = model
  const StoreContext = createContext<S>(storeState)

  function useSelector<P>(selector: StateSelector<S, P>) {
    const [state, setState] = useState(() => selector(storeState))

    const subscriber: any = (oldState: S, nextState: S) => {
      const nextSelector = selector(nextState)
      const shouldUpdate = !equal(selector(oldState), nextSelector)
      if (shouldUpdate) {
        setState(nextSelector)
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

  const dispatch: Dispatch<S, A> = (() => {
    const actionKeys: Array<keyof A> = Object.keys(actions)
    const _dispatch = actionKeys.reduce((prev, curr) => {
      const action = actions[curr]
      prev[curr] = async (pyaload) => {
        const nextState = await produce(storeState, async (draft: S) => {
           await action(draft, pyaload)
        })
        notify(storeState, nextState)
        storeState = nextState;
      }
      return prev
    }, {} as Dispatch<S, A>)
    return _dispatch
  })();

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
