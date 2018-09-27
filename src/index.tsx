import * as React from 'react'

interface ProviderProps {
  children: React.ReactNode
}

interface ConsumerProps<T> {
  children: (store: T) => React.ReactNode
  pick?: (store: T) => any
}

type Updater = (partialState: object) => void

function createContext<T>(initialStore: T) {
  const Ctx = React.createContext({})

  return {
    Provider: class extends React.Component<ProviderProps> {
      state: T
      unsubscribe: () => void
      constructor(props: ProviderProps) {
        super(props)
        this.state = initialStore
      }
      update = () => {
        this.setState({})
      }
      componentDidMount() {
        Object.keys(this.state).forEach(key => {
          this.unsubscribe = this.state[key].subscribe(this.update)
        })
      }
      componentWillUnmount() {
        this.unsubscribe()
      }
      render() {
        return (
          <Ctx.Provider value={this.state} children={this.props.children} />
        )
      }
    },

    Consumer: (props: ConsumerProps<T>) => {
      return (
        <Ctx.Consumer
          children={(store: T) =>
            props.children(props.pick ? props.pick(store) : store)
          }
        />
      )
    },

    consume: (pick: (store: T) => any) => (Component: React.ComponentType) => (
      props: any,
    ) => (
      <Ctx.Consumer
        children={(store: T) => <Component {...props} {...pick(store)} />}
      />
    ),
  }
}

class Store {
  private updaters: Updater[] = []
  setState(updater: object) {
    Object.keys(updater).forEach(key => (this[key] = updater[key]))
    setTimeout(() => {
      this.updaters.forEach(update => update(this))
    }, 0)
  }
  subscribe(fn: Updater) {
    this.updaters.push(fn)
    return () => {
      this.unsubscribe(fn)
    }
  }
  private unsubscribe(fn: Updater) {
    const index = this.updaters.indexOf(fn)
    this.updaters.splice(index, 1)
  }
}
export { createContext, Store }
