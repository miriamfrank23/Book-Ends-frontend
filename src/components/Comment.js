import React from 'react'

const Comment = ({ allComments, currentUser }) => {

  const deleteComment = (comment) => {
    debugger
  }



  const showAllComments = () => {
    return allComments.map(comment => {
      return <div className='comment' key={comment.id}> {comment.user_id}: {comment.text}
      {comment.user_id === currentUser.user.id ? <div><button>Edit</button><button onClick={() => deleteComment(comment)}>Delete</button></div> : null}
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
