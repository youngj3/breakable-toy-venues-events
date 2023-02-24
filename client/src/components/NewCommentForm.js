import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "../services/translateServerErrors.js";

const NewCommentForm = ({event, setEvent, togglePopup}) => {
  const eventId = event.exactId
  const venueId = useParams().venueId
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
        const thisEvent = body.event
        const newComment = body.newComment
        setEvent({
          ...thisEvent,
          comments: [...thisEvent.comments, newComment]
        })
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

  const handleSubmit = e => {
    e.preventDefault()
    createNewComment(newComment)
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
        <label>
          Your Thoughts on "{event.name}":
        </label>
        <textarea
            className="comment-form-input"
            id="text"
            name="text"
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