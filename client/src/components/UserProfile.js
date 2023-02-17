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
        event={event}/>
    )
  })

  let showDropZone = ""
  if (changeImage){
    showDropZone = <ChangeUserImage />
  }

  return(
    <div className="user-info">
      <div>
        <img src={user.image} />
        <h3>Welcome, {user.userName}</h3>
        <input className='button' type='button' value='Change Profile Picture?' onClick={handlePictureClick}/>
        {showDropZone}
      </div>
      <div>
        <h2>Your saved Events</h2>
        <div>
          {eventsAsReactTiles}
        </div>
      </div>
    </div>
  )
}

export default UserProfile