import React, { useState } from "react";
import ErrorList from './layout/ErrorList.js'
import { useParams } from "react-router-dom"
import translateServerErrors from '../services/translateServerErrors.js'

const EditCommentForm = props => {
  const { comment } = props
  const commentId = comment.id
  const venueId = useParams().venueId
  console.log('venueID', venueId)
  const [editedComment, setEditedComment] = useState({
    text: text
  })
  const [errors, setErrors] = useState({})

  const editComment = async (editedComment) => {
    try {
      const response = await fetch(`/api/v1/venues/${venueId}/events/${eventId}/comments/${commentId}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(editedComment)
      })
      if (!response.ok) { 
        if (response.status === 422){
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          throw new Error(`${response.status} (${response.statusText})`)
        }
      } else {
        const body = await response.json()
        return body.editedComment
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  const handleInputChange = e => {
    setEditedComment({
      ...editedComment,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('submitted? psych lol')
  }

  return (
    <>
      <h6>Edit Comment</h6>
      <form onSubmit={handleSubmit} className="comment-form">
        <ErrorList errors={errors} />
        <label htmlFor="text" >
          Change Text:
          <textarea
            name="text"
            id="text"
            onChange={handleInputChange}
            value={editedComment.text}
          />
        </label>
        <input className='button' type='submit' value='Submit' />
      </form>
    </>
  )
}

export default EditCommentForm