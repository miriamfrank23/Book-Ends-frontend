import React from 'react'


const BookShow = ({ findCurrentBook }) => {


    return (
      <div className='BookShow'>
      {findCurrentBook().thumbnail ?
        <img src={findCurrentBook().thumbnail} alt=''
        className='showImage'/>
        :
        <img  src={'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg'} alt=''
        className='showImage'/>
      }
        <div>
          Title: {findCurrentBook().title}<br/><br/>
          Description: {findCurrentBook().description}<br/>
          Page count: {findCurrentBook().page_count}
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
