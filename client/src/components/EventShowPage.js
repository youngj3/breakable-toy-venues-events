import React, { useEffect, useState } from 'react'
import createAnInterest from '../../../server/src/services/createAnInterest.js'
import deleteAnInterest from '../../../server/src/services/deleteAnInterest.js'
import CommentTile from './CommentTile.js'
import NewCommentForm from './NewCommentForm.js'
import Popup from 'reactjs-popup'

const EventShowPage = (props) => {
  const venueId = props.match.params.venueId
  const eventId = props.match.params.id
  const savedEventsList = props.savedEventsList
  const setSavedEventsList = props.setSavedEventsList
  const currentUser = props.currentUser
  
  const [ venueName, setVenueName ] = useState("")
  const [ event, setEvent ] = useState({
    id: "",
    name: "",
    image: "",
    genre: "",
    date: "",
    priceRange: "",
    description: "",
    venueId: "",
    comments: []
  })
  const [showPopup, setShowPopup] = useState(false);

  const alreadyExists = () => {
    return savedEventsList.some(savedEvent => savedEvent.id === event.id);
  }
    
  const getEventDetails = async () => {
    try {
      const response = await fetch(`/api/v1/venues/${venueId}/events/${eventId}`)
      if (!response.ok) {
				throw new Error(`${response.status} (${response.statusText})`)
			}
      const eventData = await response.json()
      setEvent(eventData.event)
    } catch(error) {
			console.error(`Error in fetch: ${error.message}`)
		}
  }

  const getLocation = async () => {
    try {
      const response = await fetch(`/api/v1/venues/${venueId}`)
      if (!response.ok) {
				throw new Error(`${response.status} (${response.statusText})`)
			}
      const venueInformation = await response.json()
      setVenueName(venueInformation.venue.name)
    } catch(error) {
			console.error(`Error in fetch: ${error.message}`)
		}
  }

  const getSavedEvents = async () => {
    if (currentUser) {
      try{
        const response = await fetch('/api/v1/interests')
        if (!response.ok) {
          throw new Error(`${response.status} (${response.statusText})`)
        }
        const body = await response.json()
        setSavedEventsList(body.savedEvents)
      } catch(error) {
        console.error(`Error in fetch: ${error.message}`)
      }
    }
  }
  
  const handleSaveEvent = e => {
    e.preventDefault()
    if (!alreadyExists()) {
      const eventId = event.id
      createAnInterest(eventId)
      setSavedEventsList([...savedEventsList, event])
    }
  }

  const handleRemoveEvent = e => {
    e.preventDefault()
    const eventId = event.id
    deleteAnInterest(eventId)
    setSavedEventsList(savedEventsList.filter(savedEvent => savedEvent.id !== event.id))
  }

  useEffect(() => {
    getEventDetails()
    getLocation()
    getSavedEvents()
  }, [])

  const togglePopup = e => {
    setShowPopup(showPopup ? false : true)
  }

  let newComment
  if (currentUser) {
    newComment = (
      <>
      <input className='button' type='button' value="Add to the Discourse!" onClick={togglePopup}/>
      <Popup
        open={showPopup}
      >
        <div className='popup'>
        <NewCommentForm 
          event={event}
          setEvent={setEvent}
          togglePopup={togglePopup}
          />
        </div>
      </Popup>
      </>
     ) 
  }

  let button = ""
  if(currentUser !== null){
    if (alreadyExists()) {
      button = <input className='button' type='button' value='Remove from your list' onClick={handleRemoveEvent} /> 
    }else{
      button = <input className='button' type='button' value='Interested? Add this concert to your list!' onClick={handleSaveEvent} />
    }
  }

  const commentsAsReact = event.comments.map(comment => {
    return (
      <CommentTile 
      key={comment.id}
      comment={comment}
      currentUser={currentUser}
      event={event}
      setEvent={setEvent}
      />
    )
  })

  const date = new Date(event.date)
  const readableDate = date.toString().substring(0,21)
  return (
    <div>
				<div className="centered-content">
					<h1>{event.name}</h1>
					<div className="grid-x">
            <div className='e-show-page-left callout secondary medium-6'>
            <img src={event.image} className="show-page-image" />
            </div>
						<div className="e-show-page-right callout secondary medium-6">
							<p><b>Genre:</b> {event.genre}</p>
							<p><b>When:</b> {readableDate}</p>
              <p><b>Where:</b> {venueName}</p>
							<p><b>Est. Price($USD):</b> {event.priceRange}</p>
              {button}
						</div>
            <div className='callout'>
            <p>{event.description}</p>
            </div>
					</div>
          {newComment}
          <div className='comment-list'>
              {commentsAsReact}
          </div>
				</div>
			</div>
  )
}

export default EventShowPage