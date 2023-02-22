const createAnInterest = async (eventId) => {
   try {
    const response = await fetch('/api/v1/interests', {
      method: "POST",
				headers: new Headers({
					"Content-Type": "application/json"
				}),
				body: JSON.stringify({eventId: eventId})
    })
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`)
    }
   } catch(error) {
    console.error(`Error in fetch: ${error.message}`)
   }
}

export default createAnInterest