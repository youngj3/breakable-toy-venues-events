import React, {useEffect, useState} from 'react'
import VenueTile from './VenueTile.js'
import boston from '../assets/images/boston.jpg'
const VenueList = props => {
  const [venueList, setVenueList] = useState([])

  const getVenues = async () => {
    try{
      const response = await fetch("/api/v1/venues")
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      } else {
        const body = await response.json()
        setVenueList(body.venues)
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const venuesAsReact = venueList.map(venue => {
    return (
      <VenueTile 
      key={venue.id}
      venue={venue}
      />
    )
  })

  useEffect(() => {
    getVenues()
  }, [])

  return (
    <div className='centered-content'>
      <h1>Major Mass Venues:</h1>
      <div className='venue-list'>
      {venuesAsReact}
      </div>
    </div>
  )
}

export default VenueList