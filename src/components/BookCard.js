import React from 'react';


const BookCard = ({ book, setCurrentBook }) => {


  const printOutAuthors = () => {
    return book.authors.map(author => {
      return <div key={author}> {author} </div>
    })
  }

  const ratingStars = () => {
    switch (book.average_rating) {
    case 1:
      return <img className='stars' alt='' src='https://interviewstream.com/wp-content/uploads/2016/04/5-star.png'/>
      break;
    case 1.5:
      return <img className='stars' alt='' src='https://interviewstream.com/wp-content/uploads/2016/04/5-star.png'/>
      break;
    case 2:
      return <img className='stars' alt='' src='https://interviewstream.com/wp-content/uploads/2016/04/5-star.png'/>
      break;
    case 2.5:
      return <img className='stars' alt='' src='https://interviewstream.com/wp-content/uploads/2016/04/5-star.png'/>
      break;
    case 3:
      return <img className='stars' alt='' src='https://interviewstream.com/wp-content/uploads/2016/04/5-star.png'/>
      break;
    case 3.5:
      return <img className='stars' alt='' src='https://interviewstream.com/wp-content/uploads/2016/04/5-star.png'/>
      break;
    case 4:
      return <img className='stars' alt='' src='https://interviewstream.com/wp-content/uploads/2016/04/5-star.png'/>
      break;
    case 4.5:
      return <img className='stars' alt='' src='https://interviewstream.com/wp-content/uploads/2016/04/5-star.png'/>
      break;
    case 5:
      return <img className='stars' alt='' src='https://interviewstream.com/wp-content/uploads/2016/04/5-star.png'/>
      break;
      }
    }


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

          Average rating:<br/>
           {ratingStars()}
        </div>
      </React.Fragment>
    )
}

export default BookCard;
