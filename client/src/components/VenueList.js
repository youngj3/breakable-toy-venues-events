import React, {useEffect, useState} from 'react'
import VenueTile from './VenueTile.js'
import boston from '../assets/images/boston.jpg'

const VenueList = props => {
  const [venueList, setVenueList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)

  const getVenues = async () => {
    try{
      const response = await fetch("/api/v1/venues")
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      } else {
        const body = await response.json()
        console.log(body)
        setVenueList(body.venues)
      }
    } catch(error) {
      console.log(error)
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const indexOfLastVenue = currentPage * itemsPerPage
  const indexOfFirstVenue = indexOfLastVenue - itemsPerPage
  const currentVenues = venueList.slice(indexOfFirstVenue, indexOfLastVenue)

  const venuesAsReact = currentVenues.map(venue => {
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

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1)
  }
  
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <div>
      <img src={boston} className="venue-list-header" />
      <div className='centered-content'>
        <h1 className='venue-list-title'>Major Mass Venues:</h1>
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