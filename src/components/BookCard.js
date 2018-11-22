import React from 'react';


const BookCard = ({ book, setCurrentBook }) => {


  const printOutAuthors = () => {
    return book.volumeInfo.authors.map(author => {
      return <div key={author}> {author} </div>
    })
  }


  // console.log(book)
    return (
      <React.Fragment>
        <div className='bookCard' onClick={() => setCurrentBook(book.id)}>
          {book.volumeInfo.imageLinks ?
          <img  src={book.volumeInfo.imageLinks.thumbnail} alt=''
          className='bookThumbnail'/>
          :
          <img  src={'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg'} alt=''
            className='bookThumbnail'/>
          }
          <br/>
          {book.volumeInfo.title} <br/>
          Author/s:{printOutAuthors()}
          Average rating: {book.volumeInfo.averageRating}
        </div>
      </React.Fragment>
    )
}

export default BookCard;
