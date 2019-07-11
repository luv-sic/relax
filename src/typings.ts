import * as React from 'react'

export interface Opt<S, R, E> {
  name?: string
  state: S
  reducers?: R
  effects?: E
}

export type ActionSelector<R, E> = (action: R & E) => any

export type Selector<S, P> = (state: S) => P
export type RenderFn<P> = (partialState: P) => React.ReactNode

export interface Reducers<S> {
  [key: string]: ReducerFn<S>
}

export type ReducerFn<S> = (state: S, payload?: any) => S | void

export interface Effects {
  [key: string]: EffectFn
}
export type EffectFn = (payload: any) => Promise<any>
