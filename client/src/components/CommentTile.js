import React, { useState } from "react";
import { useParams } from "react-router-dom";
import EditCommentForm from "./EditCommentForm.js";

const CommentTile = props => {
  const { comment, currentUser, event, setEvent } = props
  const userId = comment.userId
  const eventId = event.id
  const commentId =  comment.id
  const venueId = useParams().venueId
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

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`/api/v1/venues/${venueId}/events/${eventId}/comments/${commentId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
      if (!response.ok) {
				throw new Error(`${response.status} (${response.statusText})`)
			}
      setEvent({
        ...event,
        comments: event.comments.filter(comment => comment.id !== commentId)
      })
    } catch(error) {
			console.error(`Error in fetch: ${error.message}`)
		}
  }

  const editClickHandler = e => {
    e.preventDefault()
    setShowEditForm(true)
  }

  const handleDeleteClick = e => {
    e.preventDefault()
    deleteComment(commentId)
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