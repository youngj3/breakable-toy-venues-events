import React, { useEffect, useState } from "react"
import EventTile from "./EventTile.js"
import SimpleJsApiLoaderGoogleMap from "./map/SimpleJsApiLoaderGoogleMap.js"

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
    <div>
      <div className="centered-content">
        <h1>{venue.name}</h1>
        <p><b>Located at:</b> {fullAddress}</p>
        <div className="grid-x">
          <div className="v-show-page-left callout secondary medium-6">
            <img src={venue.image} className='show-page-image' />
          </div>
          <div className="v-show-page-left callout secondary medium-6">
            <SimpleJsApiLoaderGoogleMap location={fullAddress} />
          </div>
        </div>
        </div>
      <div className="centered-content">
				<h2>Upcoming Events:</h2>
				<div className="show-page-events-list">
					{eventsAsReactTiles}
				</div>
			</div>
    </div>
      
    
  )
}

export default VenueShowPage