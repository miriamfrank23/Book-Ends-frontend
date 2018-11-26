import React from 'react';


const BookCard = ({ book, setCurrentBook }) => {

// debugger

  const printOutAuthors = () => {
    return book.authors.map(author => {
      return <div key={author}> {author} </div>
    })
  }


  // console.log(book)
    return (
      <React.Fragment>
        <div className='bookCard' onClick={() => setCurrentBook(book.id)}>
          {book.thumbnail ?
          <img src={book.thumbnail} alt=''
          className='bookThumbnail'/>
          :
          <img  src={'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg'} alt=''
            className='bookThumbnail'/>
          }
          <br/>
          {book.title} <br/>
          Author/s:
          {book.authors ? printOutAuthors() : 'not listed'
          }

          Average rating: {book.average_rating}
        </div>
      </React.Fragment>
    )
}

export default BookCard;
