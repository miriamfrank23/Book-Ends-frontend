import React from 'react'
import Comment from './Comment'


const AllComments = ({ fetchedUsers, allComments, currentUser, deleteComments }) => {




  const showAllComments = () => {
    return allComments.map(comment => {
      return <Comment key={comment.id} comment={comment} fetchedUsers={fetchedUsers}
      currentUser={currentUser}
      deleteComments={deleteComments}
      />
    })
  }


  return (
    <div>
    {showAllComments()}
    </div>
  )

}

export default AllComments
