export interface Model<S, R, E> {
  state: S
  reducers?: R
  effects?: E
}

export type StateSelector<S, P> = (state: S) => P

export interface Reducers<S> {
  [key: string]: ReducerFn<S>
}

export type ReducerFn<S> = (state: S, payload?: any) => any

export interface Effects {
  [key: string]: EffectFn
}

export type EffectFn = (payload: any) => Promise<any>

export type Subscriber<S> = (oldState: S, nextState: S) => any

export type ExtractActionFromReducersEffects<R, E> = keyof (R & E)

// export type ExtractPayloadFromReducersEffects<
//   S,
//   R extends Reducers<S>,
//   E extends Effects,
//   A extends ExtractActionFromReducersEffects<R, E>
// > = Parameters<R[A]>[1] | Parameters<E[A]>[0]
