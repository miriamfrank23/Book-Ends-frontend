import React from 'react'
import BookCard from './BookCard'

const BooksBody = ({ fetchedBooks, searchInput, setCurrentBook }) => {


  const mapThroughBooks = () => {
    return filterThroughBooks().map(book => {
      return <BookCard
        setCurrentBook={setCurrentBook}
        book={book}
        key={book.id}
      />
    })
  }

  const filterThroughBooks = () => {
    console.log(fetchedBooks);
    return fetchedBooks.filter(book => {
      return (
        book.title.toLowerCase().includes(searchInput.toLowerCase())
        ||
          book.description.toLowerCase().includes(searchInput.toLowerCase())
      ||
        book.authors[0].toLowerCase().includes(searchInput.toLowerCase())
      )
    })
  }
  // need to update filter
  // ||
  //   book.volumeInfo.authors.forEach(author => author.toLowerCase().includes(searchInput.toLowerCase())
  //   )


    return (
      <div className='booksBody'>
      {mapThroughBooks()}
      </div>
    )

}

export default BooksBody
