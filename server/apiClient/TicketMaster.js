import got from 'got'
import dotenv from "dotenv"
dotenv.config()

const apiKey = process.env.TICKET_MASTER_KEY;
const baseUrl = 'https://app.ticketmaster.com/discovery/v2/';


class TicketMaster {

  static async fetchVenues() {
    try{
      const url = `${baseUrl}/venues?stateCode=MA&apikey=${apiKey}`
      const apiResponse = await got(url)
      const responseBody = apiResponse.body
      const apiData = JSON.parse(responseBody)

      return apiData
    } catch (error) {
      return { error: error.message };
    }
  }

  static async organizeVenues(){
    const venueData = await TicketMaster.fetchVenues()
    const easyAccessVenueData = venueData._embedded.venues
    const venues = easyAccessVenueData.map(venue => {
      let returnImage = ""
      let image = venue.images
      if (image !== undefined) {
        returnImage = Object.values(image[0])[1]
      }
      return { 
        name: venue.name,
        exactId: venue.id, 
        image: returnImage, 
        city: venue.city.name, 
        state: venue.state.stateCode, 
        address: venue.address.line1,
        postalCode: venue.postalCode

      }
    })
    return venues
  }
}

export default TicketMaster