import React from 'react'

const Comment = ({ allComments }) => {
  // debugger

  const showAllComments = () => {
    return allComments.map(comment => {
      return <div key={comment.id}> {comment.text} </div>
    })
  }


  return (
    <div>
    {showAllComments()}
    </div>
  )

}

export default Comment
