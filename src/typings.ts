export interface Model<S, A> {
  state: S
  actions: A
}

export type StateSelector<S, P> = (state: S) => P

export interface Actions<S> {
  [key: string]: Action<S>
}

export type Dispatch<S, A extends Actions<S>> = {
  [key in keyof A]: (payload?: Parameters<A[key]>[1]) => Promise<void> | void;
}

export type Action<S, P = any> = (state: S, payload: P) => Promise<void> | void;

export type Subscriber<S> = (oldState: S, nextState: S) => void
