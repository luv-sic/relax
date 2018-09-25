import * as React from 'react'
import Store from './Store'

export default function inject(...stores: Store[]) {
  return function wrapWithInject(WrappedComponent: React.ComponentType) {
    return class Inject extends React.Component<{}> {
      static displayName = `Inject(${getDisplayName(WrappedComponent)})`

      readonly state = {
        store: {},
      }

      stores: object
      unsubscribe: () => void

      constructor(props, context) {
        super(props, context)
        this.stores = createStores(stores)
      }

      listener = () => {
        this.setState({ store: this.stores })
      }

      componentDidMount() {
        if (stores) {
          Object.keys(this.stores).forEach(key => {
            this.unsubscribe = this.stores[key].subscribe(this.listener)
          })
          this.listener()
        }
      }

      componentWillUnmount() {
        this.unsubscribe()
      }

      render() {
        console.log('render inject.........')
        const props = {
          ...this.props,
          ...this.state.store,
        }

        if (!Object.keys(this.state.store).length) return null
        return <WrappedComponent {...props} />
      }
    }
  }
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

function createStores(stores) {
  const instances = {}
  stores.forEach(store => {
    const { name } = store.constructor
    const key = firstLowerCase(name)
    instances[key] = store
  })
  return instances
}

function firstLowerCase(str: string): string {
  return str.replace(/^[A-Z]/g, L => L.toLowerCase())
}
