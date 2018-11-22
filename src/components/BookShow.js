import React from 'react'


const BookShow = ({ findCurrentBook }) => {


    return (
      <div className='BookShow'>
      {findCurrentBook().volumeInfo.imageLinks ?
        <img src={findCurrentBook().volumeInfo.imageLinks.thumbnail} alt=''
        className='showImage'/>
        :
        <img  src={'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg'} alt=''
        className='showImage'/>
      }
        <div>
          Title: {findCurrentBook().volumeInfo.title}<br/><br/>
          Description: {findCurrentBook().volumeInfo.description}<br/>
          Page count: {findCurrentBook().volumeInfo.pageCount}
            <button>
            I read this book
            </button><br/>
          Leave a comment:
          <input />
          <button>
          Submit
          </button>
        </div>
      </div>
    )

}

export default BookShow
