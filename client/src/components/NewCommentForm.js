import React, { useState } from "react";
import { useParams } from "react-router-dom"
import ErrorList from "./layout/ErrorList"

const NewCommentForm = ({event, setEvent, togglePopup}) => {
  const venueId = useParams().venueId
  const eventId = event.id
  const [newComment, setNewComment] = useState({
    text: ""
  })
  const [errors, setErrors] = useState({})

  const createNewComment = async (newComment) => {
    try{
      const response = await fetch(`/api/v1/venues/${venueId}/events/${eventId}/comments`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newComment)
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
        return body.newComment
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const clearForm = () => {
    setNewComment({
      text: ""
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const newCommentData = await createNewComment(newComment)
    setEvent({
      ...event,
      comments: [...event.comments, newCommentData]
    })
    togglePopup()
    clearForm()
  }

  const handleInputChange = e => {
    setNewComment({
      ...newComment,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="comment-form">
        <h6><b>Get in on the discourse!</b></h6>
        <ErrorList errors={errors} />
        <label htmlFor="text" >
          Your Thoughts on "{event.name}":
        </label>
        <textarea
            className="comment-form-input"
            name="text"
            id="text"
            onChange={handleInputChange}
            value={newComment.text}
          />
          <br />
          <div className="comment-form-buttons">
            <input className='button' type='submit' value='Submit' />
            <input className='button' type='submit' value='Close' onClick={togglePopup}/>
          </div>
      </form>
    </>
  )
}

export default NewCommentForm