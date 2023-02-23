import got from 'got'
import dotenv from "dotenv"
dotenv.config()

const apiKey = process.env.TICKET_MASTER_KEY;
const baseUrl = 'https://app.ticketmaster.com/discovery/v2/';


class TicketMaster {

  static async fetchVenues(stateCode) {
    try {
      const url = `${baseUrl}/venues?stateCode=${stateCode}&apikey=${apiKey}`
      const apiResponse = await got(url)
      const responseBody = apiResponse.body
      const apiData = JSON.parse(responseBody)

      return apiData
    } catch (error) {
      return { error: error.message };
    }
  }

  static async organizeVenues(stateCode) {
    const venueData = await TicketMaster.fetchVenues(stateCode)
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

  static async fetchRelatedEvents(exactId) {
    try {
      const url = `${baseUrl}/events?venueId=${exactId}&classificationName=music&apikey=${apiKey}`
      const apiResponse = await got(url)
      const responseBody = apiResponse.body
      const apiData = JSON.parse(responseBody)

      return apiData
    } catch (error) {
      return { error: error.message };
    }
  }

  static async organizeRelatedEvents(exactId) {
    const someData = await this.fetchRelatedEvents(exactId)

    if (someData._embedded === undefined) {
      const noData = []
      return noData
    }

    const events = someData._embedded.events
    const organizedEvents = events.map(event => {
      let lowPrice
      let highPrice

      if (event.priceRanges && event.priceRanges[0]) {
        lowPrice = event.priceRanges[0].min
        highPrice = event.priceRanges[0].max
      } else {
        lowPrice = "n/a"
        highPrice = "n/a"
      }
     
      let returnImage
      let image = event.images
      if (image !== undefined) {
        returnImage = Object.values(image[0])[1]
      } else {
        returnImage = ""
      }

      return {
        name: event.name,
        id: event.id,
        image: returnImage,
        date: event.dates.start.dateTime,
        genre: event.classifications[0].genre.name,
        priceRange: `${lowPrice} - ${highPrice}`
      }
    })
    return organizedEvents
  }
}

export default TicketMaster