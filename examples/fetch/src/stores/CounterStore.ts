import { createStore } from '../src'

const { useStore, dispatch, getState, query } = createStore({
  state: {
    count: 10,
    name: 'Counter',
  },
  reducers: {
    increment(state, payload: number = 1) {
      state.count += payload
    },
    decrement(state) {
      state.count--
    },
  },
  effects: {
    async asyncIncrement() {
      await sleep(1000)
      dispatch(A => A.increment, 2)
    },
    async asyncDecrement() {
      await sleep(1000)
      dispatch(A => A.increment)
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

export default { useStore, dispatch, getState, query }
export { useStore, dispatch, getState, query }
