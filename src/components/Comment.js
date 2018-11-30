import React from 'react'

const Comment = ({ allComments, currentUser }) => {
  // debugger

  const showAllComments = () => {
    return allComments.map(comment => {
      return <div className='comment' key={comment.id}> {currentUser.first_name}: {comment.text}
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
