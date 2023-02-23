import TicketMaster from "../../../apiClient/TicketMaster.js";
import OpenAi from "../../../apiClient/OpenAi.js";
import { Event, Venue } from "../../models/index.js";
import dotenv from "dotenv"
dotenv.config()

const apiKey = process.env.OPEN_AI_KEY;
const openai = new OpenAi(apiKey)

class EventSeeder {
  static async seed() {
    const venues = await Venue.query()
    const basePrompt = "Write a description for this concert (maxtokens 150): "

    for (let i = 0; i < venues.length; i++) {
      let searchId = venues[i].exactId
      let relatedEvents = await TicketMaster.organizeRelatedEvents(searchId)
      let eventsToBeSeeded = await Promise.all(relatedEvents.map(async event => {
        let prompt = basePrompt + event.name
        let description = await OpenAi.generateText(prompt)

        return {
          name: event.name,
          image: event.image,
          date: event.date,
          genre: event.genre,
          priceRange: event.priceRange,
          description: description,
          venueId: venues[i].id
        }
      }))

    for(const event of eventsToBeSeeded) {
        const currentEvent = await Event.query().findOne({name: event.name, genre: event.genre})
        if (!currentEvent) {
          await Event.query().insert(event)
        }
      }
    }
  }
}

export default EventSeeder

