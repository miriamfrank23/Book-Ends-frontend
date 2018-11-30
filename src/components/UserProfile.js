import React from 'react'

const UserProfile = ({ currentUser, backToIndex }) => {


  const showUserComments = () => {
    if (currentUser.comments.length > 0) {
      return currentUser.comments.map(comment => {
        return <div key={comment}>{comment}</div>
      })
    } else {
      return "You haven't commented on any books yet"
    }
  }

  const showUserBooks = () => {
    if (currentUser.books.length > 0) {
      return currentUser.books.map(book => {
        return <div key={book}>{book}</div>
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
