import React, { useEffect, useState } from 'react'

const EventShowPage = (props) => {
  const venueId = props.match.params.venueId
  const eventId = props.match.params.id
  console.log(venueId, eventId)
  const [ event, setEvent ] = useState({
    id: "",
    name: "",
    image: "",
    genre: "",
    date: "",
    priceRange: "",
    description: "",
    venueId: ""
  })
  
  const getEventDetails = async () => {
    try {
      const response = await fetch(`/api/v1/venues/${venueId}/events/${eventId}`)
      if (!response.ok) {
				throw new Error(`${response.status} (${response.statusText})`)
			}
      const eventData = await response.json()
      setEvent(eventData.event)
    } catch(error) {
      console.log(error)
			console.error(`Error in fetch: ${error.message}`)
		}
  }

  useEffect(() => {
    getEventDetails()
  }, [])

  return (
    <div>
				<div className="centered-content">
					<h1>{event.name}</h1>
					<div className="event-show-page-flex">
						<div className="event-show-page-info">
							<p>Genre: {event.genre}</p>
							<p>When: {event.date}</p>
							<p>About: {event.description}</p>
							<p>Est. Price: {event.priceRange}</p>    
						</div>
						<img src={event.image} className="show-page-image" />
					</div>
				</div>
			</div>
  )
}

export default EventShowPage