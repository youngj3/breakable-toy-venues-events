import React from 'react'
import { Link } from "react-router-dom";

const VenueTile = ({venue}) => {
  const {id, name, city, state, image, exactId} = venue

  let venueImage
	if (image) {
		venueImage = <img className="card-img" src={image}/>
	}

  const nameLink = <Link to={`/venues/${exactId}`}>{name}</Link>

  return (
    <div className='venue-tile'>
      {venueImage}
      <h4>{nameLink}</h4>
      <p>{city}, {state}</p>
    </div>
  )
}

export default VenueTile