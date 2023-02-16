import React, { useEffect, useState } from "react";
import ChangeUserImage from './uploads/ChangeUserImage.js'

const UserProfile = props => {
  const id = props.match.params
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
    </div>
  )
}

export default UserProfile