import * as React from 'react'
import renderer from 'react-test-renderer'
import { createStore } from '../src'

import 'jest-dom/extend-expect'

const { Consumer, mutate, getState } = createStore({ count: 1 })

test('Consumer && mutate() && getState()', () => {
  const component = renderer.create(<Consumer>{state => state.count}</Consumer>)

  expect(getState()).toEqual({ count: 1 })
  expect(component.toJSON()).toBe('1')

  mutate(state => state.count++)

  expect(component.toJSON()).toBe('2')
  expect(getState()).toEqual({ count: 2 })
})
