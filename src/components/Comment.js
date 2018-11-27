import React from 'react'

const Comment = ({ allComments }) => {
  // debugger

  const showAllComments = () => {
    return allComments.map(comment => {
      return <div className='comment' key={comment.id}> This will be user who posted: {comment.text}
      <br/><button> Edit </button>
      <button> Delete </button>
      </div>
    })
  }


  return (
    <div>
    {showAllComments()}
    </div>
  )

}

export default Comment
