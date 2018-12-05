import React, { Component } from 'react'
import AllComments from './AllComments'


class BookShow extends Component {

  constructor () {
    super()
    this.state = {
      comment: '',
      allComments: [],
      commentEditing: null
    }
  }

  componentDidMount () {
    this.showComments()
  }

  deleteComments = (comment) => {
    const allNewComments = this.state.allComments.filter(eachComment => {
      return comment.id !== eachComment.id
    })
    this.setState({
      allComments: allNewComments
    })
  }

  editComment = (comment) => {
    this.setState({
      comment: comment.text,
      commentEditing: comment
    }, () => {
      console.log(this.state.comment, this.state.commentEditing)
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
    //newComment
    if (!this.state.commentEditing) {
      const { findCurrentBook, currentUser } = this.props

      const newComment =  {
        user_id: currentUser.id,
        book_id: findCurrentBook().id,
        text: this.state.comment
      }
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
      .then(resp => resp.json())
      .then(json => {
        const allNewComments = this.state.allComments.concat(json)
        this.setState({
          comment: '',
          allComments: allNewComments
        })
      })
    } else {
      //editing comment
      console.log('editing comment')
      fetch(`http://localhost:4000/api/v1/comments/${this.state.commentEditing.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          text: this.state.comment
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(resp => {
        return resp.json()
      })
      .then(editedComment => {
        // debugger
        const commentRemoved = this.state.allComments.filter(comment => {
          return comment.id !== editedComment.id
        })
        const newComments = commentRemoved.concat(editedComment)
        this.setState({
          comment: '',
          allComments: newComments,
          commentEditing: null
        })
      })
    }
  }

  printOutAuthors = () => {
    const { findCurrentBook } = this.props
    return findCurrentBook().authors.map(author => {
      return <div key={author}> {author} </div>
    })
  }

  addToUserBooks = () => {
    const { findCurrentBook, currentUser, setCurrentUser } = this.props

    //optimistically render
    const addedBookToArray = currentUser.user_books.concat({
      book_id: findCurrentBook().id,
      user_id: currentUser.id
    })
    currentUser.user_books = addedBookToArray

    setCurrentUser(currentUser)

    //patch to db
    // debugger
    fetch(`http://localhost:4000/api/v1/user_books`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: currentUser.id,
        book_id: findCurrentBook().id
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(resp => resp.json())
    .then(json => {
      console.log(json)
    })
  }

  addToWishBooks = () => {
    const { findCurrentBook, currentUser, setCurrentUser } = this.props

    //optimistically render
    const addedBookToArray = currentUser.wish_books.concat({
      book_id: findCurrentBook().id,
      user_id: currentUser.id
    })
    currentUser.wish_books = addedBookToArray

    setCurrentUser(currentUser)

    //patch to db
    // debugger
    fetch(`http://localhost:4000/api/v1/wish_books`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: currentUser.id,
        book_id: findCurrentBook().id
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(resp => resp.json())
    .then(json => {
      console.log(json)
    })
  }

  checkIfUserHasRead = () => {
    const { findCurrentBook, currentUser } = this.props
    if (currentUser.user_books.length > 0) {
      return currentUser.user_books.find(user_book => {
        return user_book.book_id === findCurrentBook().id
      })
    }
  }

  checkIfUserWishlist = () => {
    const { findCurrentBook, currentUser } = this.props
    if (currentUser.wish_books.length > 0) {
      return currentUser.wish_books.find(wish_book => {
        return wish_book.book_id === findCurrentBook().id
      })
    }
  }

  showButtons = () => {
    if (this.checkIfUserHasRead()) {
      return <div>You read this book!</div>
    } else if (this.checkIfUserWishlist()) {
      return <div>You added this book to your wishlist!</div>
    } else {
      return <div className='readButtonsContainer'>
      <button onClick={this.addToUserBooks}>
      I read this book
      </button>
      <button onClick={this.addToWishBooks} className='wantToRead'>
      I want to read this book
      </button>
      </div>
      }
    }


  render () {
    const { findCurrentBook } = this.props

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
          {this.showButtons()}

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
            deleteComments={this.deleteComments}
            editComment={this.editComment}/>
            :
            null
          }

          </div>
        </div>
      </div>
    )
  }
}


export default BookShow
