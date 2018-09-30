import renderer from 'react-test-renderer'
import { createStore } from '../src'

test('No selector', () => {
  const { consume, mutate, getState } = createStore({
    count: 1,
    name: 'Counter',
  })
  const component = renderer.create(consume(state => state.count))

  expect(getState()).toEqual({ count: 1, name: 'Counter' })
  expect(component.toJSON()).toBe('1')

  mutate(state => state.count++)

  expect(component.toJSON()).toBe('2')
  expect(getState()).toEqual({ count: 2, name: 'Counter' })

  component.unmount()
})

test('With selector', () => {
  const { consume, mutate, getState } = createStore({
    count: 1,
    name: 'Counter',
  })
  const component = renderer.create(consume(state => state.name, name => name))

  expect(getState()).toEqual({ count: 1, name: 'Counter' })

  console.log(component.toJSON())
  expect(component.toJSON()).toBe('Counter')

  mutate(state => (state.name = 'New Counter'))

  expect(component.toJSON()).toBe('New Counter')

  component.unmount()
})
