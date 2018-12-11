import React, { Component } from 'react'
const axios = require('axios')


class Comment extends Component {

  constructor() {
    super()
    this.state = {
      users: []
    }
  }

  componentWillMount() {
    this.fetchUsers()
  }

  fetchUsers = () => {
    console.log('start fetching users')
    axios.get('https://book-ends.herokuapp.com/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(resp => {
      console.log('before setting users');
      this.setState({
        users: resp.data
      }, () => {
        console.log(this.state.users);
      })
    })
  }

  deleteComment = (comment) => {
    //optimistically render

    this.props.deleteComments(comment)

    axios.delete(
      `https://book-ends.herokuapp.com/comments/${comment.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(resp => {
      console.log(resp);
    })
  }


  findUser = () => {
    // debugger
    return this.state.users.find(user => {
      return this.props.comment.user_id === user.id
    })
  }

  renderComment = () => {
    if (this.state.users.length > 0) {
      return <div className='comment'> <span className='userCommentName'>{this.findUser().first_name}</span>: {this.props.comment.text}
      {this.props.comment.user_id === this.props.currentUser.id ? <div><button onClick={() => this.props.editComment(this.props.comment)}>Edit</button><button onClick={() => this.deleteComment(this.props.comment)}>Delete</button></div> : null}
      </div>
    } else {
      return 'Loading comment'
    }
  }

render () {
  return (
    <div>
      {this.renderComment()}
    </div>
  )
}

}

export default Comment
