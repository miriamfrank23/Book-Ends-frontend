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
    fetch(`http://localhost:4000/api/v1/books/${findCurrentBook().id}/comments`)
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        allComments: json
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
    fetch(`http://localhost:4000/api/v1/books/${findCurrentBook().id}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: 1,
        book_id: findCurrentBook().id,
        text: this.state.comment
      }),
      headers:{
        'Content-Type': 'application/json'
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



  render () {
    const { findCurrentBook } = this.props
    console.log(this.state.allComments)
    return (
      <div className='BookShow'>
        {findCurrentBook().thumbnail ?
          <img src={findCurrentBook().thumbnail} alt=''
          className='showImage'/>
          :
          <img  src={'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg'} alt=''
          className='showImage'/>
        }
        <div>
        Title: {findCurrentBook().title}<br/><br/>
        Description: {findCurrentBook().description}<br/>
        Page count: {findCurrentBook().page_count}
        <button>
        I read this book
        </button><br/>
        Leave a comment:
        <input
        value={this.state.comment}
        onChange={this.captureComment}/>
        <button
        onClick={this.createComment}>
        Submit
        </button>
        </div>
        <Comment allComments={this.state.allComments}/>
      </div>
    )
  }
}


export default BookShow
