import React from 'react'
import { Link } from "react-router-dom";

const EventTile = ({event}) => {
  const { id, name, image, venueId } = event
  const eventId = id
  let eventImage
	if (image) {
		eventImage = <img className="event-tile-picture" src={image}/>
	}

  const nameLink = <Link to={`/venues/${venueId}/events/${eventId}`}>{name}</Link>

  return (
    <div className='event-tile card'>
      {eventImage}
      <h4>{nameLink}</h4>
    </div>
  )
}

export default EventTile