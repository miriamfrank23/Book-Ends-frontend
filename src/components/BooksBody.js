import React from 'react'
import BookCard from './BookCard'

const BooksBody = ({ fetchedBooks, searchInput }) => {

  const mapThroughBooks = () => {
    return filterThroughBooks().map(book => {
      // console.log(book)
      return <BookCard
        book={book}
        key={book.id}
      />
    })
  }

  const filterThroughBooks = () => {
    return fetchedBooks.filter(book => {
      return (
        book.volumeInfo.title.toLowerCase().includes(searchInput.toLowerCase())
      // ||
      //   book.volumeInfo.authors.forEach(author => author.toLowerCase().includes(searchInput.toLowerCase())
      //   )
      // need to update filter
      )
    })
  }


    return (
      <div className='booksBody'>
      {mapThroughBooks()}
      </div>
    )

}

export default BooksBody
