import { createStore } from 'stamen'

interface Post {
  id: number
  userId: string
  title: string
  body: string
}

interface State {
  loading: boolean
  posts: Post[]
}

const initialState: State = {
  loading: true,
  posts: [],
}

export const { useStore, dispatch } = createStore({
  state: initialState,
  reducers: {
    updateLoading(state, status: boolean) {
      state.loading = status
    },
    updatePosts(state, posts: Post[]) {
      state.posts = posts
    },
  },
  effects: {
    async fetchPost() {
      const url = 'https://jsonplaceholder.typicode.com/posts?userId=1'
      const posts = await fetch(url).then(response => response.json())

      // delay for show loading
      await sleep(1500)

      dispatch('updateLoading', false)
      dispatch('updatePosts', posts)
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

export default { useStore, dispatch }
