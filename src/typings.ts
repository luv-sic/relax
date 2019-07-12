export interface Opt<S, R, E> {
  name?: string
  state: S
  reducers?: R
  effects?: E
}

export type ActionSelector<R, E> = (action: R & E) => any
export type StateSelector<S, P> = (state: S) => P

export interface Reducers<S> {
  [key: string]: ReducerFn<S>
}
export type ReducerFn<S> = (state: S, payload?: any) => any

export interface Effects {
  [key: string]: EffectFn
}
export type EffectFn = (payload: any) => Promise<any>

export interface Updater<S> {
  update: (set: any, action: ReducerFn<S>, payload: any) => any
  set: any
}
