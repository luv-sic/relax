import { Store } from 'stamen'

class CounterStore extends Store {
  count = 0

  increment() {
    console.log('+++')
    this.setState({ count: this.count + 1 })
  }

  decrement() {
    this.setState({ count: this.count - 1 })
  }

  incrementAsync() {
    setTimeout(() => {
      this.setState({ count: this.count + 1 })
    }, 1000)
  }
}

export default new CounterStore()
