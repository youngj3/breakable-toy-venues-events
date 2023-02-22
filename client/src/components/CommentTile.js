import React, { useState } from "react";
import EditCommentForm from "./EditCommentForm.js";

const CommentTile = props => {
  const { comment, currentUser, event, setEvent } = props
  const userId = comment.userId

  const [showEditForm, setShowEditForm] = useState(false)

  let editForm
  if(showEditForm) {
    editForm = <EditCommentForm
      comment={comment}
      event={event}
      setEvent={setEvent}
      setShowEditForm={setShowEditForm}
    />
  }


  const editClickHandler = e => {
    setShowEditForm(true)
    console.log('edit')
  }

  const handleDeleteClick = e => {
    console.log('lol')
  }



  let editButton = ""
  if(currentUser && currentUser.id === userId) {
    editButton = <input className="button" type="button" value="Edit" onClick={editClickHandler} />
  }

  let deleteButton = ""
  if (currentUser && currentUser.id === userId) {
    deleteButton = <input className='button' type='button' value='Delete' onClick={handleDeleteClick}/>
  }

  return (
    <div className="comment-tile callout"> 
      <p><img src={comment.image} className='comment-image'/>@{comment.userName}</p>
      <p>{comment.text}</p>
      {editButton}
      {deleteButton}
      {editForm}
    </div>
  )
}

export default CommentTile