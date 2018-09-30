import { createStore } from 'stamen'

const { consume, mutate } = createStore({ count: 1 })

const actions = {
  increment() {
    mutate(state => state.count++)
  },
  decrement() {
    mutate(state => state.count--)
  },
  asyncIncrement() {
    setTimeout(() => {
      mutate(state => {
        state.count++
      })
    }, 1000)
  },
  async asyncDecrement() {
    await new Promise((resolve, _) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
    mutate(state => state.count--)
  },
}

export { consume, mutate, actions }
