import React, { useEffect, useState } from "react"
import EventTile from "./EventTile.js"

const VenueShowPage = props => {
  const venueId = props.match.params.id

  const [ venue, setVenue ] = useState({
    name: "",
    city: "",
    state: "",
    image: "",
    address: "",
    postalCode: "",
    events: []
  })

  const getVenueInformation = async () => {
    try {
      const response = await fetch(`/api/v1/venues/${venueId}`)
      if (!response.ok) {
				throw new Error(`${response.status} (${response.statusText})`)
			}
			const venueInformation = await response.json()
      setVenue(venueInformation.venue)
    } catch(error) {
			console.error(`Error in fetch: ${error.message}`)
		}
  }

  useEffect(() => {
    getVenueInformation()
  }, [])

  const eventsAsReactTiles = venue.events.map(event => {
    return (
      <EventTile
        key={event.id}
        event={event}/>
    )
  })

  const fullAddress = `${venue.address}, ${venue.city}, ${venue.state} ${venue.postalCode}`
  return (
    <div className="centered-content">
      <h1>{venue.name}</h1>
      <div className="show-page-flex">
				<div className="show-page-info">
          <p>{fullAddress}</p>
        </div>
        <img src={venue.image} className='show-page-image' />
      </div>
      {eventsAsReactTiles}
    </div>
  )
}

export default VenueShowPage