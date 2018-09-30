import * as React from 'react'

export interface ConsumerProps<T> {
  children: (state: T) => React.ReactNode
  selector?: any
}
export type MutateFn<T> = (draft: T) => void
