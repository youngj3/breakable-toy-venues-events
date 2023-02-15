import Serializer from "./Serializer.js";

class EventSerializer extends Serializer {
  static async getDetailsForVenueShow(event) {
    const serializedEvent = this.serialize(event, ['id', 'venueId', 'name', 'image', 'genre', 'date', 'priceRange', 'description'])
    return serializedEvent
  }
}

export default EventSerializer