import React, { useEffect, useState } from "react"

const VenueShowPage = props => {
  const venueId = props.match.params.id

  const [ venue, setVenue ] = useState({})

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
    </div>
  )
}

export default VenueShowPage