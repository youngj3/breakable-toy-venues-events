import React from 'react'
import { Link } from "react-router-dom";

const VenueTile = ({venue}) => {
  const {id, name, city, state, image} = venue

  let venueImage
	if (image) {
		venueImage = <img className="card-img-left example-card-img-responsive" src={image}/>
	}

  const nameLink = <Link to={`/venues/${id}`}>{name}</Link>

  return (
    <div className='venue-tile card flex-row'>
      {venueImage}
      <h4>{nameLink}</h4>
      <p>{city}, {state}</p>
    </div>
  )
}

export default VenueTile