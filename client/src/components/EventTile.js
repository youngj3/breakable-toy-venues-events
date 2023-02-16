import React from 'react'
import { Link } from "react-router-dom";

const EventTile = ({event}) => {
  const {id, name, image, date, genre, venueId, description, priceRange} = event

  let eventImage
	if (image) {
		eventImage = <img className="event-tile-picture" src={image}/>
	}

  const nameLink = <Link to={`/venues/${venueId}`}>{name}</Link>

  return (
    <div className='event-tile card'>
      {eventImage}
      <h4>{nameLink}</h4>
    </div>
  )
}

export default EventTile