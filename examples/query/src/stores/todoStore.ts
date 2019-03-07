import { createStore, Result } from '../src/index'

interface TodoItem {
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

export const { useStore, dispatch, query, fetch } = createStore({
  state: initialState,
})

export default { useStore, dispatch, query, fetch }
