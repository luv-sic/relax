import { createStore } from 'stamen'

const { useStore } = createStore({
  name: 'TodoStore',
  state: {
    count: 10,
    name: 'Counter',
  },
  reducers: {
    increment(state, payload: any = 1) {
      state.count += payload
    },
    decrement(state) {
      state.count--
    },
  },
  effects: {
    async asyncIncrement(put) {
      await sleep(1000)
      put('increment')
    },
    async asyncDecrement(act) {
      await sleep(1000)
      act('decrement', 1)
    },
  },
})

function sleep(time: number) {
  return new Promise(resove => {
    setTimeout(() => {
      resove()
    }, time)
  })
}

export { useStore }
