import React from 'react'
import BookCard from './BookCard'

const BooksBody = ({ fetchedBooks, searchInput, setCurrentBook }) => {

  const mapThroughBooks = () => {
    return fetchedBooks.map(book => {
      return <BookCard
        setCurrentBook={setCurrentBook}
        book={book}
        key={book.id}
      />
    })
  }

  return (
    <div className='booksBody'>
    {mapThroughBooks()}
    </div>
  )

}

export default BooksBody
