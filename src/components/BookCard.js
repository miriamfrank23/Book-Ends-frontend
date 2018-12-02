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
      return <div>
        <span className="fa fa-star checked fa-lg"></span>
        <span className="fa fa-star-o fa-lg" ></span>
        <span className="fa fa-star-o fa-lg"></span>
        <span className="fa fa-star-o fa-lg"></span>
        <span className="fa fa-star-o fa-lg"></span>
      </div>
    case 1.5:
      return <div>
        <span className="fa fa-star checked fa-lg"></span>
        <span className="fa fa-star-half-o fa-lg"></span>
        <span className="fa fa-star-o fa-lg"></span>
        <span className="fa fa-star-o fa-lg"></span>
        <span className="fa fa-star-o fa-lg"></span>
      </div>
    case 2:
    return <div>
      <span className="fa fa-star checked fa-lg"></span>
      <span className="fa fa-star checked fa-lg"></span>
      <span className="fa fa-star-o fa-lg"></span>
      <span className="fa fa-star-o fa-lg"></span>
      <span className="fa fa-star-o fa-lg"></span>
    </div>
    case 2.5:
      return  <div>
        <span className="fa fa-star checked fa-lg"></span>
        <span className="fa fa-star checked fa-lg"></span>
        <span className="fa fa-star-half-o fa-lg"></span>
        <span className="fa fa-star-o fa-lg"></span>
        <span className="fa fa-star-o fa-lg"></span>
      </div>
    case 3:
    return <div>
      <span className="fa fa-star checked fa-lg"></span>
      <span className="fa fa-star checked fa-lg"></span>
      <span className="fa fa-star checked fa-lg"></span>
      <span className="fa fa-star-o fa-lg"></span>
      <span className="fa fa-star-o fa-lg"></span>
    </div>
    case 3.5:
      return <div>
        <span className="fa fa-star checked fa-lg"></span>
        <span className="fa fa-star checked fa-lg"></span>
        <span className="fa fa-star checked fa-lg"></span>
        <span className="fa fa-star-half-o fa-lg"></span>
        <span className="fa fa-star-o fa-lg"></span>
      </div>
    case 4:
    return <div>
      <span className="fa fa-star checked fa-lg"></span>
      <span className="fa fa-star checked fa-lg"></span>
      <span className="fa fa-star checked fa-lg"></span>
      <span className="fa fa-star checked fa-lg"></span>
      <span className="fa fa-star-o fa-lg"></span>
    </div>
    case 4.5:
      return <div>
        <span className="fa fa-star checked fa-lg"></span>
        <span className="fa fa-star checked fa-lg"></span>
        <span className="fa fa-star checked fa-lg"></span>
        <span className="fa fa-star checked fa-lg"></span>
        <span className="fa fa-star-half-o fa-lg"></span>
      </div>
    case 5:
    return <div>
      <span className="fa fa-star checked fa-lg"></span>
      <span className="fa fa-star checked fa-lg"></span>
      <span className="fa fa-star checked fa-lg"></span>
      <span className="fa fa-star checked fa-lg"></span>
      <span className="fa fa-star checked fa-lg"></span>
    </div>
    default:
      return 'hi';
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
           {ratingStars()}
        </div>
      </React.Fragment>
    )
}

export default BookCard;
