import { createStore } from 'stamen'

const { consume, mutate } = createStore({
  id: '2668081',
  type: 'User',
  name: 'forsigner',
  company: 'Seasun',
  blog: 'http://forsigner.com',
  location: 'GZ',
  bio: 'Find the bug of the world~',
  followers: 232,
  following: 47,
  created_at: '2012-10-28T09:11:53Z',
  updated_at: '2018-09-28T12:16:20Z',
})

const actions = {
  updateName() {
    mutate(state => (state.name = 'My name is so long................................'))
  },
  reset() {
    mutate(state => (state.name = 'forsigner'))
  },
}

export { consume, mutate, actions }
