import * as React from 'react'

export interface ConsumerProps<T> {
  children: (state: T) => React.ReactNode
  selected?: any
}
export type MutateFn<T> = (draft: T) => void
export type Updater<T> = (fn: MutateFn<T>) => void
