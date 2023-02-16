export default async function geoCode (location) {
  const apiKey = 'AIzaSyAfRs5ivkpcrV14qQL9I75Ve4gz3AaBpDM'
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKey}`)
    if (!response.ok){
      const errorMessage = `${response.status}: (${response.statusText})`
      throw new Error(errorMessage)
    }
    const body = await response.json()
    return body.results[0].geometry.location
  } catch(error) {
    console.error(`error in fetch: ${error}`)
  }
}