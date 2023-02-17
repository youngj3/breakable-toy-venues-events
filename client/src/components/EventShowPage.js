import React, { useEffect, useState } from 'react'

const EventShowPage = (props) => {
  const venueId = props.match.params.venueId
  const eventId = props.match.params.id

  const [ venueName, setVenueName ] = useState("")
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
  
  useEffect(() => {
    getEventDetails()
    getLocation()
  }, [])

  const handleSaveEvent = () => {
    event.preventDefault()
  }
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
              <input className='button' type='button' value='Interested? Add this concert to your list!' onClick={handleSaveEvent} />
						</div>
            <div className='callout'>
            <p>{event.description}</p>
            </div>
					</div>
				</div>
			</div>
  )
}

export default EventShowPage