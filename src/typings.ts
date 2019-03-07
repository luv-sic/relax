import * as React from 'react'

export interface Opt<S, R, E> {
  name?: string
  state: S
  reducers?: R
  effects?: E
}

export interface Updater<S> {
  update: (set: any, action: ReducerFn<S>, payload: any) => any
  set: any
}

export type ActionSelector<R, E> = (action: R & E) => any

export type ActFn<R> = (action: R, payload?: any) => void

export type Selector<S, P> = (state: S) => P
export type RenderFn<P> = (partialState: P) => React.ReactNode

export interface Reducers<S> {
  [key: string]: ReducerFn<S>
}

export type ReducerFn<S> = (state: S, payload?: any) => S | void

export interface Effects {
  [key: string]: EffectFn
}
export type EffectFn = (payload: any) => any

export interface Result<T> {
  loading: boolean
  data: T
  error: any
}

export interface Variables {
  [key: string]: any
}

export interface Config {
  rest: {
    endpoint: string
    body?: {
      [key: string]: string
    }
    headers?: {
      [key: string]: string
    }
  }
  graphql: {
    endpoint: string
    headers?: {
      [key: string]: string
    }
  }
}
