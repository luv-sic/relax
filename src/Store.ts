type Listener = () => void

export default class Model {
  state: object
  private listeners: Listener[] = []

  setState = (updater?) => {
    this.state = { ...this.state, ...updater }
    this.listeners.forEach(listener => listener())
  }

  subscribe(fn: Listener) {
    this.listeners.push(fn)
    return () => {
      this.unsubscribe(fn)
    }
  }

  unsubscribe(fn: Listener) {
    const index = this.listeners.indexOf(fn)
    this.listeners.splice(index, 1)
  }
}
