import React from 'react'
import Books from '../images/books.svg'


const UserProfile = ({ currentUser, backToIndex, fetchedBooks, setCurrentBook}) => {


  const showUserComments = () => {
    if (currentUser.comments.length > 0) {
      return currentUser.comments.map(comment => {
        return <div key={comment.id}>{comment.text}</div>
      })
    } else {
      return "You haven't commented on any books yet"
    }
  }

  const showUserBooks = () => {
    if (currentUser.user_books.length > 0) {

      const bookIds = currentUser.user_books.map(book => {
        return book.book_id
      })

      const readBooks = fetchedBooks.filter(book => bookIds.includes(book.id))

      return readBooks.map(book => {
        return <div key={book.id} className='userShowBookContainer'>
          <img alt='' src={book.thumbnail} className='userShowBook' onClick={() => goToBookShow(book.id)}/>
          {book.title}
        </div>
      })

    } else {
      return "You haven't read any books yet"
    }
  }

  const goToBookShow = (id) => {
    setCurrentBook(id)
    backToIndex()
  }


  return (
    <div>
      <div id='logo'>
        <div>
          Book
        </div>
        <img alt='' src={Books}
        id='logoBook'/>
        <div>
         Ends
        </div>
        </div>
      <div className='centerButton'>
      <button onClick={backToIndex} id='userProfileButton'>
        Back to browse
      </button>
      </div>
      <div className='trees'>
      </div>
      <div className='userProfile'>

        <h2 className='profileWelcomeHeader'>
          Welcome {currentUser.first_name}!
        </h2>

        {currentUser.user_books.length > 0 ?
          <h3>
          You've read {currentUser.user_books.length} books!
          </h3> :
          null
        }
        <div className='outerUserBooksContainer'>
        {showUserBooks()}
        </div><br/><br/>

        {currentUser.comments.length > 0 ?
        <h3>
        You've commented {currentUser.comments.length} times!
        </h3> :
        null
        }
        {showUserComments()}<br/>
      </div>
      <div className='trees'>
      </div>
    </div>
  )

}

export default UserProfile
