import './App.css';
import { DataStore } from '@aws-amplify/datastore';
import { Post, User, Comment } from './models';
import { useState, useEffect } from 'react'

function App() {

  const [state, setState] = useState({
    users: [],
    posts: [],
    comments: []
  })


  async function getState() {

    // fetch data
    const users = await DataStore.query(User)
    const posts = await DataStore.query(Post)
    const comments = await DataStore.query(Comment)

    // set state = data
    setState((state) => (
      {
        ...state,
        users,
        posts,
        comments
      }
    ))
  }


  // only get state once
  useEffect(() => {
    getState()
  }, [])

  function getUser(postUserID) {
    // pass in post's UserID
    // search users array
    // find user with that i.d.
    let user = state.users.find(obj => obj.id === postUserID)
    // return name of that user
    return user.name
  }

  function getComments(postID) {
    let currComments = state.comments.map(item => item.postID === postID)
    // console.log(currComments)

    // return currComments.map(x => (
    //   <div className="ind-comment">{x.text}</div>
    // ))
  }

  return (
    <div className="App">
      {state.posts.map(post => (
        <div className="post" key={post.id}>
          <div className="userName">@{getUser(post.userID)}</div>
          <div className="postText">{post.text}</div>
          <div className="comments">
            <div className="ind-comment">This is a placeholder comment</div>
            {getComments(post.id)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
