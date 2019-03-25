import React, { useEffect } from 'react'
import { useStore, dispatch } from 'stores/postStore'

const Posts = () => {
  const { loading, posts } = useStore(S => S)
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
