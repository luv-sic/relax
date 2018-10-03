import renderer from 'react-test-renderer'
import { Store } from '../src'

test('No selector', () => {
  expect('1').toBe('1')
  const store = new Store('TodoStore')
    .initState({
      count: 1,
      name: 'Counter',
    })
    .initActions((mutate: any) => ({
      increment() {
        mutate((state: any) => state.count++)
      },
      decrement() {
        mutate((state: any) => state.count--)
      },
      asyncIncrement() {
        setTimeout(() => {
          mutate((state: any) => state.count++)
        }, 1000)
      },
      async asyncDecrement() {
        await new Promise((resolve, _) => {
          setTimeout(() => {
            resolve()
          }, 1000)
        })
        mutate((state: any) => state.count--)
      },
    }))

  const { getState, consume } = store
  console.log('store:', store)
  console.log('store.state:', store.actions)
  console.log('store.actions:', store.actions)

  const component = renderer.create(consume(state => state.count))

  expect(getState()).toEqual({ count: 1, name: 'Counter' })
  expect(component.toJSON()).toBe('1')
})
