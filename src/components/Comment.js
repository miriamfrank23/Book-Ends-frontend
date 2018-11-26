import React from 'react'

const Comment = ({ allComments }) => {
  // debugger

  const showAllComments = () => {
    return allComments.map(comment => {
      return <div key={comment.id}> This will be user who posted: {comment.text} </div>
    })
  }


  return (
    <div>
    {showAllComments()}
    </div>
  )

}

export default Comment
