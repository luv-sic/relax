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

const { consume, mutate } = createStore<State>({
  loading: true,
  posts: [],
})

const actions = {
  updateLoading(status: boolean) {
    mutate(state => {
      state.loading = false
    })
  },
  updatePosts(posts: Post[]) {
    mutate(state => {
      state.posts = posts
    })
  },
  async fetchPost() {
    const url = 'https://jsonplaceholder.typicode.com/posts?userId=1'
    const posts = await fetch(url).then(response => response.json())

    // delay for show loading
    setTimeout(() => {
      this.updateLoading(false)
    }, 1500)

    this.updatePosts(posts)
  },
}

export { consume, mutate, actions }
