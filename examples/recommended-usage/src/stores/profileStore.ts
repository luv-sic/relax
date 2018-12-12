import { createStore } from 'stamen'

export const { useStore, dispatch } = createStore({
  state: {
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
  },
  reducers: {
    updateName(state) {
      state.name = 'My name is so long................................'
    },

    reset(state) {
      state.name = 'forsigner'
    },
  },
})

export default { useStore, dispatch }
