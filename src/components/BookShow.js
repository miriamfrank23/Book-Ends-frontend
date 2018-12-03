import React, { Component } from 'react'
import AllComments from './AllComments'



class BookShow extends Component {

  constructor () {
    super()
    this.state = {
      comment: '',
      allComments: []
    }
  }

  componentDidMount () {
    this.showComments()
  }

  deleteComments = (comment) => {
    const allNewComments = this.state.allComments.filter(eachComment => {
      return comment.id !== eachComment.id
    })
    debugger
    this.setState({
      allComments: allNewComments
    })
  }

  showComments = () => {
    const { findCurrentBook } = this.props
    fetch(`http://localhost:4000/api/v1/comments`, {
        method: 'GET',
        headers: {
           Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      }
    )
    .then(resp => resp.json())
    .then(json => {
      const bookComments = json.filter(comment => {
        return comment.book_id === findCurrentBook().id
      })
      this.setState({
        allComments: bookComments
      })
    })
  }

  captureComment = (e) => {
    this.setState({
      comment: e.target.value
    }, () => {
      console.log(this.state)
    })
  }

  createComment = () => {
    const { findCurrentBook, currentUser } = this.props
    // optimistically render
    const newComment =  {
      user_id: currentUser.id,
      book_id: findCurrentBook().id,
      text: this.state.comment
    }
    const allNewComments = this.state.allComments.concat(newComment)

    this.setState({
      allComments: allNewComments
    })

    //send new comment to db
    console.log('creating comment')
    fetch(`http://localhost:4000/api/v1/comments`, {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(resp => {
      console.log(resp);
      this.setState({
        comment: ''
      })
    })
  }

  printOutAuthors = () => {
    const { findCurrentBook } = this.props
    return findCurrentBook().authors.map(author => {
      return <div key={author}> {author} </div>
    })
  }


  render () {
    const { findCurrentBook } = this.props
    // console.log(this.state.allComments)
    return (
      <div>
        <div className='trees'>
        </div>
        <div className='bookShow'>
          <div className='showImageContainer'>
            <img src={findCurrentBook().thumbnail} alt=''
            className='showImage'/>
          </div>
          <div className='bookDetails'>
            Title: <br/>{findCurrentBook().title}<br/><br/>
            Written by: {this.printOutAuthors()}<br/>
            Description: <br/>{findCurrentBook().description}<br/><br/>
            Publisher: <br/>{findCurrentBook().publisher}<br/><br/>
            Date published: <br/>{findCurrentBook().date_published}<br/><br/>
            Page count: <br/>{findCurrentBook().page_count}
          </div>
          <div className='commentsSection'>
          <button>
            I read this book
          </button>
          <br/>
            Leave a comment:
          <input
          value={this.state.comment}
          onChange={this.captureComment}/>
          <button
          onClick={this.createComment}>
            Submit
          </button>

          {this.state.allComments.length > 0 ?
            <AllComments allComments={this.state.allComments}
            currentUser={this.props.currentUser}
            fetchedUsers={this.props.fetchedUsers}
            deleteComments={this.deleteComments}/> :
            null
          }

          </div>
        </div>
        <div className='trees'>
        </div>
      </div>
    )
  }
}


export default BookShow



// <button>
// I want to read this book
// </button>
