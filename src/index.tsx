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

  function createDispatch() {
    const actionKeys: Array<keyof A> = Object.keys(actions)
    const dispatcher = actionKeys.reduce((dispatches, actionKey) => {
      const action = actions[actionKey]
      dispatches[actionKey] = async (payload) => {
        const oldState = getState();
        const nextState = await produce(oldState, async (draft: S) => {
          await action(draft, payload)
        })

        // FIXME fix in nest dispatch, the outer dispatch execute later, may revert the update by inner dispatch
        // see test dispatch.asyncIncrement
        !equal(oldState, nextState) && notify(oldState, nextState)
      }
      return dispatches
    }, {} as Dispatch<S, A>)
    return dispatcher
  }

  const dispatch: Dispatch<S, A> = createDispatch();

  function notify(oldState: S, nextState: S) {
    subscribers.forEach(subscriber => {
      subscriber(oldState, nextState)
    })
    storeState = nextState;
  }

  const EnhancedProvider: FC<{
    initialState?: S
    children: ReactNode
  }> = ({ initialState, children }) => {
    // useEffect to prevent update Provider's child component while rendering Provider
    useEffect(() => {
      if (initialState) {
        !equal(storeState, initialState) && notify(storeState, initialState)
      }
    }, [initialState])
    return <StoreContext.Provider value={initialState as S}>{children}</StoreContext.Provider>
  }

  return { useSelector, dispatch, getState, Provider: EnhancedProvider }
}

export { createStore }
export * from './typings'
