import Serializer from "./Serializer.js";
import CommentSerializer from "./CommentSerializer.js";

class EventSerializer extends Serializer {
  static async getDetailsForVenueShow(event) {
    const serializedEvent = this.serialize(event, ['id', 'venueId', 'name', 'image'])
    return serializedEvent
  }

  static async getDetailsForEventShow(event) {
    try{
      const serializedEvent = this.serialize(event, ['id', 'venueId', 'name', 'image', 'genre', 'date', 'priceRange', 'description', 'exactId'])
      const relatedComments = await event.$relatedQuery("comments")
      const serializedComments = await Promise.all(
        relatedComments.map(async (comment) => {
          return await CommentSerializer.getDetail(comment)
        })
      )
      serializedEvent.comments = serializedComments
      return serializedEvent
    } catch(error) {
      throw(error)
    }
  }
}

export default EventSerializer