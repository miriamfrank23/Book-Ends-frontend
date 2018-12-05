import React from 'react'
import Books from '../images/books.svg'


const UserProfile = ({ currentUser, backToIndex, fetchedBooks, setCurrentBook }) => {


  // const showUserComments = () => {
  //   if (currentUser.comments.length > 0) {
  //     return currentUser.comments.map(comment => {
  //       return <div key={comment.id}>{comment.text}</div>
  //     })
  //   } else {
  //     return "You haven't commented on any books yet"
  //   }
  // }

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

  const showWishBooks = () => {
    if (currentUser.wish_books.length > 0) {

      const bookIds = currentUser.wish_books.map(book => {
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
      return "You haven't added any books to your wishlist yet"
    }
  }

  const goToBookShow = (id) => {
    setCurrentBook(id)
    backToIndex()
  }

  const showNumberOfBooksRead = () => {
    if (!currentUser.user_books.length) {
      return null
    } else if (currentUser.user_books.length === 1) {
      return <h3>
      You've read 1 book!
      </h3>
    } else {
      return <h3>
      You've read {currentUser.user_books.length} books!
      </h3>
    }
  }

  const showNumberOfWishBooks = () => {
    if (!currentUser.wish_books.length) {
      return null
    } else if (currentUser.wish_books.length === 1) {
      return <h3>
      You have 1 book on your wishlist!
      </h3>
    } else {
      return <h3>
      You have {currentUser.wish_books.length} books on your wishlist!
      </h3>
    }
  }


  return (
    <div>
      <div className='trees'>
      </div>
      <div className='userProfile'>

        <h2 className='profileWelcomeHeader'>
          Welcome {currentUser.first_name}!
        </h2>

        {showNumberOfBooksRead()}
        <div className='outerUserBooksContainer'>
        {showUserBooks()}
        </div><br/><br/>


        {showNumberOfWishBooks()}
        <div className='outerUserBooksContainer'>
          {showWishBooks()}
        </div><br/><br/>

        </div>
    </div>
  )

}

export default UserProfile
