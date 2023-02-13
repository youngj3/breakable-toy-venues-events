import Serializer from "./Serializer.js";

class VenueSerializer extends Serializer {
  static getDetailsForIndex(venues){
    const serializedVenues = venues.map(venue => {
      return this.serialize(venue, ["id", "name", "city", "state", "image"])
    })
    return serializedVenues
  }

  static getDetailsForShow(venue){
    return this.serialize(venue, ["id", "name", "city", "state", "image", "address", "postalCode"])
  }
}

export default VenueSerializer