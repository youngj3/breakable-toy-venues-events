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
      setPopularEvents(body.popularEvents)
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getPopularEvents()
  }, [])

  const popularEventsAsReactTiles = popularEvents?.map(event => {
    return (
      <EventTile 
      key={event.id}
      event={event}
      venueId={event.venueId}/>
    )
  })

  return (
    <div>
      <div>
        <HomePageBanner />
      </div>
      <div className="centered-content">
        <div>
          <h1>Why GigGuide?</h1>
          <p><b>Discover concerts in your area:</b> With our app, you can easily browse and find upcoming concerts and events near you. Say goodbye to FOMO and hello to a world of live music and entertainment!</p>
          <p><b>Save concerts to your list:</b> Once you find a concert you're interested in, you can easily add it to your saved events list, making it easy to keep track of your favorite shows and plan your calendar accordingly.</p>
          <p><b>Free to use:</b> Best of all, our app is completely free to use! You can browse and save concerts without any hidden fees or charges.</p>
        </div>
        <h2>Trending Concerts:</h2>
        <div className="landing-page-events-list">
          {popularEventsAsReactTiles}
        </div>
      </div>
    </div>
  )
}

export default LandingPage