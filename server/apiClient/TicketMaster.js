import got from 'got'
import dotenv from "dotenv"
dotenv.config()

const apiKey = process.env.TICKET_MASTER_KEY;
const baseUrl = 'https://app.ticketmaster.com/discovery/v2/';


class TicketMaster {

  static async fetchResponseData (url) {
    const apiResponse = await got(url)
    const responseBody = apiResponse.body
    return JSON.parse(responseBody)
  }

  static async fetchSingleVenue(exactId) {
    try {
      const url = `${baseUrl}/venues?id=${exactId}&apikey=${apiKey}`
      const apiData = await this.fetchResponseData(url)
      return apiData
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getVenueName(venueId) {
    const venueData = await this.fetchSingleVenue(venueId)
    const venueName = venueData._embedded.venues[0].name
    return venueName
  }

  static async prepareVenueForShowPage(exactId) {
    try {
      const venueData = await this.fetchSingleVenue(exactId)
      const easyAccessVenueData = venueData._embedded.venues
      const venue = easyAccessVenueData.map(venue => {
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
          postalCode: venue.postalCode,
          location: venue.location 
        }
      })
      return venue[0]
    } catch (error) {
      return { error: error.message };
    }
  }

  static async fetchVenues(stateCode) {
    try {
      const url = `${baseUrl}/venues?stateCode=${stateCode}&apikey=${apiKey}`
      const apiData = await this.fetchResponseData(url)
      return apiData
    } catch (error) {
      return { error: error.message };
    }
  }

  static async organizeVenues(stateCode) {
    try {
      const venueData = await this.fetchVenues(stateCode)
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
        }
      })
      return venues
    } catch (error) {
      return { error: error.message };
    }
  }

  static async fetchRelatedEvents(exactId) {
    try {
      const url = `${baseUrl}/events?venueId=${exactId}&classificationName=music&apikey=${apiKey}`
      const apiData = await this.fetchResponseData(url)
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
      let returnImage
      let image = event.images
      if (image !== undefined) {
        returnImage = Object.values(image[0])[1]
      } else {
        returnImage = ""
      }

      return {
        name: event.name,
        exactId: event.id,
        image: returnImage,
      }
    })
    return organizedEvents
  }

  static async fetchEventForShowPage (eventId) {
    try {
      const url = `${baseUrl}/events?id=${eventId}&apikey=${apiKey}`
      const eventData = await this.fetchResponseData(url)
      return eventData
    } catch (error) {
      return { error: error.message };
    }
  }

  static async prepareEventForShowPage (eventId) {
    try {
      const eventData = await this.fetchEventForShowPage(eventId)
      const event = eventData._embedded.events.map(event => {
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
        exactId: event.id,
        image: returnImage,
        date: event.dates.start.dateTime,
        genre: event.classifications[0].genre.name,
        priceRange: `${lowPrice} - ${highPrice}`
      }
      })
      return event[0]
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getVenueIdFromEventQuery(eventId) {
    const eventData = await this.fetchEventForShowPage(eventId)
    const venueId = eventData._embedded.events[0]._embedded.venues[0].id
    return venueId
  }

}

export default TicketMaster