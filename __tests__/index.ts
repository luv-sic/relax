import { createStore } from '../src/index'
import { renderHook, act } from '@testing-library/react-hooks'

const { useSelector, dispatch, getState } = createStore({
  state: {
    count: 0,
  },
  reducers: {
    increment(state, payload: any) {
      state.count += payload
    },
    decrement(state, payload: number) {
      state.count -= payload
    },
    setCount(state, payload) {
      state.count = payload
    },
  },
  effects: {
    async asyncIncrement(payload) {
      await new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 50)
      })
      dispatch('increment', payload)
    },
  },
})

test('useStore', async () => {
  const { result, unmount } = renderHook(() => useSelector(s => s.count))

  expect(result.current).toBe(0)

  expect(getState()).toEqual({
    count: 0,
  })

  await act(async () => {
    await dispatch('increment', 1)
  })

  expect(result.current).toBe(1)

  await act(async () => {
    await dispatch('decrement', 1)
    await dispatch('decrement', 1)
  })

  expect(result.current).toBe(-1)

  await act(async () => {
    await dispatch('asyncIncrement', 1)
  })

  expect(result.current).toBe(0)

  await act(async () => {
    await dispatch('setCount', 2)
  })
  expect(result.current).toBe(2)

  unmount()
})
