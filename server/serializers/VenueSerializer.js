import Serializer from "./Serializer.js";
import EventSerializer from "./EventSerializer.js";

class VenueSerializer extends Serializer {
  static getDetailsForIndex(venues){
    const serializedVenues = venues.map(venue => {
      return this.serialize(venue, ["id", "name", "city", "state", "image"])
    })
    return serializedVenues
  }

  static async getDetailsForShow(venue){
    try {
      const serializedVenue = this.serialize(venue, ["id", "name", "city", "state", "image", "address", "postalCode"])
      const eventsForSerialization = await venue.$relatedQuery('events')
      const serializedEvents = await Promise.all(
        eventsForSerialization.map(async event => {
          return await EventSerializer.getDetailsForVenueShow(event)
        })
      )
      serializedVenue.events = serializedEvents
      console.log(serializedVenue)
      return serializedVenue
    } catch(error) {
      throw(error)
    }
  }
}

export default VenueSerializer