import React, { Component } from 'react'
import Comment from './Comment'



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
    const { findCurrentBook } = this.props
    console.log('creating comment')
    fetch(`http://localhost:4000/api/v1/comments`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: this.props.currentUser.id,
        book_id: findCurrentBook().id,
        text: this.state.comment
      }),
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(resp => resp.json())
    .then(json => {
      const newComments = this.state.allComments.concat(json)
      this.setState({
        allComments: newComments,
        comment: ''
      }, () => {
        console.log(this.state.allComments)
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
    console.log(this.state.allComments)
    return (
      <div className='bookShow'>
      <div className='bookDetails'>
        {findCurrentBook().thumbnail ?
          <img src={findCurrentBook().thumbnail} alt=''
          className='showImage'/>
          :
          <img  src={'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg'} alt=''
          className='showImage'/>
        }
        <div>
        Title: <br/>{findCurrentBook().title}<br/><br/>
        Written by: {this.printOutAuthors()}<br/>
        Description: <br/>{findCurrentBook().description}<br/><br/>
        Publisher: <br/>{findCurrentBook().publisher}<br/><br/>
        Date published: <br/>{findCurrentBook().date_published}<br/><br/>
        Page count: <br/>{findCurrentBook().page_count}<br/>
        </div>
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
        </div>
        <div className='commentContainer'>
          <Comment allComments={this.state.allComments}
          currentUser={this.props.currentUser}/>
        </div>
      </div>
    )
  }
}


export default BookShow



// <button>
// I want to read this book
// </button>
