import React, {useEffect, useState} from "react";
import HomePageBanner from "./banner/HomePageBanner.js";
import EventTile from "./EventTile.js";

const LandingPage = props => {
  const [popularEvents, setPopularEvents] = useState([])

  const getPopularEvents = async () => {
    try {
      const response = await fetch('/api/v1/interests/popular')
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const body = await response.json()
      console.log(body)
      setPopularEvents(body.popularEvents)
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getPopularEvents()
  }, [])

  const popularEventsAsReactTiles = popularEvents.map(event => {
    return (
      <EventTile 
      key={event.id}
      event={event}/>
    )
  })

  return (
    <div>
      <div>
        <HomePageBanner />
      </div>
      <div className="centered-content">
        <h1>Trending Concerts:</h1>
        <div className="landing-page-events-list">
          {popularEventsAsReactTiles}
        </div>
      </div>
    </div>
  )
}

export default LandingPage