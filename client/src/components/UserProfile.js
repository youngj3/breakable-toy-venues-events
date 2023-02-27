import React, { useEffect, useState } from "react";
import ChangeUserImage from './uploads/ChangeUserImage.js'
import EventTile from "./EventTile.js";

const UserProfile = props => {
  const id = props.match.params
  const savedEventsList = props.savedEventsList
  const setSavedEventsList = props.setSavedEventsList
  const [ user, setUser ] = useState({})
  const [ changeImage, setChangeImage ] = useState(false)

  const getUser = async () => {
    try {
      const response = await fetch(`/api/v1/users/${id}`)
      if(!response.ok) {
        const errorMessage = `${response.status}: (${response.statusText})`
        throw new Error(errorMessage)
      }
      const body = await response.json()
      setUser(body.user)
      setSavedEventsList(body.interests)
      } catch (error) {
        console.error(`error in fetch: ${error}`)
      }
  }

  useEffect(() => {
    getUser()
  }, [])

  const handlePictureClick = event => {
    event.preventDefault()
    setChangeImage(changeImage ? false : true)
  }

  const eventsAsReactTiles = savedEventsList.map(event => {
    return (
      <EventTile
        key={event.id}
        event={event}
        venueId={event.venueId}
      />
    )
  })

  let showDropZone = ""
  if (changeImage){
    showDropZone = <ChangeUserImage />
  }

  return(
    <div>
      <div className="centered-content">
        <div className="grid-x">
          <div className="user-page-left callout secondary medium-6">
            <img src={user.image} className="show-page-image"/>
            <input className='button' type='button' value='Change Profile Picture?' onClick={handlePictureClick}/>
          </div>
          <div className="user-page-right callout secondary medium-6">
            <h1>Welcome back, {user.userName}</h1>
            <p>{user.firstName}, {user.lastName}</p>
            <p>{user.email}</p>
          </div>
        </div>
        {showDropZone}
      </div>
      <div className="centered-content">
        <h2>Your saved Events:</h2>
        <div className="events-user-profile">
          {eventsAsReactTiles}
        </div>
      </div>
    </div>
  )
}

export default UserProfile