const deleteAnInterest = async (eventId, setSavedEventsList, savedEventsList) => {
  try {
    const response = await fetch(`/api/v1/interests/${eventId}`, {
      method: "DELETE",
      headers: new Headers({
      "Content-Type": "application/json"
      })
    })
    if (!response.ok) {
			throw new Error(`${response.status} (${response.statusText})`)
		}
    //setSavedEventsList(savedEventsList.filter(savedEvent => savedEvent.id !== eventId))
  } catch(error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}

export default deleteAnInterest