import * as React from 'react'
import { consume, actions } from '@stores/postStore'

class Posts extends React.Component {
  componentDidMount() {
    actions.fetchPost()
  }
  render() {
    return (
      <div className="box">
        <h2>Post List</h2>
        <div>
          <ul>
            {consume(({ posts, loading }) => {
              if (loading) {
                return <div>Loading...</div>
              }
              return posts.map(post => <li key={post.id}>{post.title}</li>)
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default Posts
