import * as React from 'react'
import PostStore from '@stores/PostStore'

const Posts = () => {
  const { get, dispatch } = PostStore.useStore()
  const { loading, posts } = get(s => s)

  const USE_EFFECT = 'useEffect'
  const useEffect = React[USE_EFFECT]
  useEffect(() => {
    dispatch('fetchPost')
  })

  return (
    <div className="box">
      <h2>Post List</h2>
      <div>
        <ul>
          {loading && <div>Loading...</div>}
          {!loading && posts.map(post => <li key={post.id}>{post.title}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default Posts
