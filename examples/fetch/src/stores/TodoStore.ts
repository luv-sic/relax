import { gql } from 'gery'
// import { createStore } from 'stamen'
import { createStore, Result } from './stamen'

interface TodoItem {
  userId: number
  id: number
  title: string
  completed: boolean
}

interface State {
  todo: Result<Partial<TodoItem>>
}

const initialState: State = {
  todo: {
    loading: false,
    error: null,
    data: {},
  },
}

const { useStore, dispatch, query } = createStore({
  state: initialState,
  graphqls: {
    getMovie: gql`
      query getMovie($title: String) {
        Movie(title: $title) {
          releaseDate
          actors {
            name
          }
        }
      }
    `,
  },
  reducers: {
    updateTodo(state, payload) {
      state.todo = payload
    },
  },
  effects: {
    async fetchTodo(payload) {
      const r = await query(g => g.getMovie, {
        variables: {
          title: 'Inception',
        },
      })

      console.log('r:', r)

      dispatch(a => a.updateTodo, {
        loading: true,
        data: {},
      })

      const url = `https://jsonplaceholder.typicode.com/todos/${payload}`
      const data = await fetch(url).then(response => response.json())

      dispatch('updateTodo', {
        loading: false,
        data,
      })
    },
  },
})

export default { useStore, dispatch, query }
export { useStore, dispatch, query }
