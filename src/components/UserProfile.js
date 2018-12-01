import React from 'react'

const UserProfile = ({ currentUser, backToIndex }) => {


  const showUserComments = () => {
    // debugger
    if (currentUser.user.comments.length > 0) {
      return currentUser.user.comments.map(comment => {
        return <div key={comment.id}>{comment.text}</div>
      })
    } else {
      return "You haven't commented on any books yet"
    }
  }

  const showUserBooks = () => {
    if (currentUser.user.books.length > 0) {
      return currentUser.user.books.map(book => {
        return <div key={book.id}>
        <img alt='' src={book.thumbnail}/><br/>
        {book.title}
        </div>
      })
    } else {
      return "You haven't added any read books yet"
    }
  }


  return (
    <div>
      <button onClick={backToIndex}>
        Look at books
      </button>
      <div className='userProfile'>
        <h2>
          Welcome {currentUser.first_name}!
        </h2>
        {showUserComments()}<br/>
        {showUserBooks()}
      </div>
    </div>
  )

}

export default UserProfile
