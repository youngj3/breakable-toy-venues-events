import TicketMaster from "../../../apiClient/TicketMaster.js";
import OpenAi from "../../../apiClient/OpenAi.js";
import { Event } from "../../models/index.js";
import dotenv from "dotenv"
dotenv.config()

const apiKey = process.env.OPEN_AI_KEY;
const openai = new OpenAi(apiKey)

class EventSeeder {
  static async seed() {
    const basePrompt = "Write a description for this concert (maxtokens 150): "
    const searchExactIds = ['vvG17Z99LL7Uql', 'vv1AvZAOtGkdNZAg8', 'k7vGF9PeCQoOP']
    const eventsToBeSeeded = []
    for (const searchId of searchExactIds) {
      const event = await TicketMaster.prepareEventForShowPage(searchId)
      const prompt = basePrompt + event.name
      const venueId = await TicketMaster.getVenueIdFromEventQuery(searchId)
      const description = await OpenAi.generateText(prompt)
      event.venueId = venueId
      event.description = description
      eventsToBeSeeded.push(event)
    }
    
    for(const event of eventsToBeSeeded) {
      const currentEvent = await Event.query().findOne({exactId: event.exactId})
      if (!currentEvent) {
        await Event.query().insert(event)
      }
    } 
  }
}

export default EventSeeder