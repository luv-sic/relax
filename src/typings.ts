import * as React from 'react'
import { Variables } from 'gery'

export interface Opt<S, G, R, E> {
  name?: string
  state: S
  graphqls?: G
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

export interface Graphqls {
  [key: string]: any
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

export interface QueryParams {
  variables: Variables
  stateKey?: string
}

export interface Config {
  graphql: {
    endpoint: string
    headers: {
      [key: string]: string
    }
  }
}
