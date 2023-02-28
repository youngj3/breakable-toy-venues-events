import React, {useEffect, useState} from 'react'
import VenueTile from './VenueTile.js'

const VenueList = props => {
  const [venueList, setVenueList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)

  const getVenues = async () => {
    try{
      const searchQuery = props.location.search
      const response = await fetch(`/api/v1/venues${searchQuery}`)
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

  const indexOfLastVenue = currentPage * itemsPerPage
  const indexOfFirstVenue = indexOfLastVenue - itemsPerPage
  const currentVenues = venueList.slice(indexOfFirstVenue, indexOfLastVenue)

  const venuesAsReact = currentVenues.map(venue => {
    return (
      <VenueTile 
      key={venue.exactId}
      venue={venue}
      />
    )
  })

  useEffect(() => {
    getVenues()
  }, [props.location.search])

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1)
  }
  
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <div>
      <div className='centered-content'>
        <h1 className='venue-list-title'>Major Venues</h1>
        <input className='button' type='button' value='Previous' onClick={goToPreviousPage} disabled={currentPage === 1}/>
        <input className='button' type='button' value='   Next   ' onClick={goToNextPage} disabled={currentVenues.length < itemsPerPage} />
        <div className='venue-list'>
        {venuesAsReact}
        </div>
      </div>
    </div>
  )
}

export default VenueList