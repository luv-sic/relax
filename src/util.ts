export function getActionName(action: any): string {
  if (typeof action === 'string') return action

  try {
    const str: string = action.toString()

    if (str.indexOf('=>') !== -1) {
      return str.split('.')[1]
    }

    const regAction = /return.*\.(.*)[;,}]/
    const arr: any = str.match(regAction) || []
    return arr[1]
  } catch (e) {
    throw new Error('action type or selector invalid')
  }
}
