import { useEffect } from 'react'

export function useMount(mount: any): void {
  useEffect(mount, [])
}

export function useUnmount(unmount: any) {
  useEffect(
    () => () => {
      if (unmount) unmount()
    },
    [],
  )
}

export function getActionName(action: any): string {
  if (typeof action === 'string') return action

  try {
    const str = action.toString()
    const regAction = /return.*\.(.*)[;,}]/
    const arr: any = str.match(regAction) || []
    return arr[1]
  } catch {
    throw new Error('action type or selector invalid')
  }
}
