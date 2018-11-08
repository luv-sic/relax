import * as React from 'react'

export interface Opt<S, R, E> {
  name?: string
  state: S
  reducers?: R
  effects?: E
}

export type Updater<S> = (action: reducerFn<S>, payload: any) => any
export type ActionSelector<R, E> = (action: R & E) => any

export type ActFn<R> = (action: R, payload?: any) => void

export type Selector<S, P> = (state: S) => P
export type RenderFn<P> = (partialState: P) => React.ReactNode

export interface Reducers<S> {
  [key: string]: reducerFn<S>
}

export type reducerFn<S> = (state: S, payload?: any) => S | void

export type effectFn = (act: (action: string, payload?: any) => any, payload?: any) => any

export interface Effects {
  [key: string]: effectFn
}
