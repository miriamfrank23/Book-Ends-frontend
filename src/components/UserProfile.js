import React from 'react'
const axios = require('axios')



const UserProfile = ({ currentUser, backToIndex, fetchedBooks, setCurrentBook, setCurrentUser }) => {

  const findUserBookId = (book) => {
    return currentUser.user_books.find(eachBook => {
      return eachBook.book_id === book.id
    })
  }

  const findWishBookId = (book) => {
    return currentUser.wish_books.find(eachBook => {
      return eachBook.book_id === book.id
    })
  }

  const deleteUserBook = (event, book) => {

    if (event.target.className === 'deleteUserBookButton') {

      // delete from db
      axios.delete(
        `https://book-ends.herokuapp.com/user_books/${findUserBookId(book).id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        })
        .then(resp => {
          // console.log('user book deleted from db')
          //pesimistically render
          const newUserBooks = currentUser.user_books.filter(eachBook => {
            return eachBook.book_id !== book.id
          })
          currentUser.user_books = newUserBooks

          //reset state
          setCurrentUser(currentUser)
        }
      )


    } else if (event.target.className === 'deleteWishBookButton') {

      //delete from db
      axios.delete(
      `https://book-ends.herokuapp.com/wish_books/${findWishBookId().id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
          })
        .then(resp => {
          // console.log('wish book deleted from db')
          //pesimistically render
          const newWishBooks = currentUser.wish_books.filter(eachBook => {
            return eachBook.book_id !== book.id
          })
          currentUser.wish_books = newWishBooks

          //reset state
          setCurrentUser(currentUser)
        }
      )
    }

  }

  // const switchToRead = (e, book) => {
  //   debugger
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
          <button className='deleteUserBookButton' onClick={(e) =>
            deleteUserBook(e, book)
          }>
          Remove
          </button>
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
          <button className='deleteWishBookButton' onClick={(e) => deleteUserBook(e, book)}>
          Remove
          </button>
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
