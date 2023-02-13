import TicketMaster from "../../../apiClient/TicketMaster.js";
import { Venue } from "../../models/index.js";

class VenueSeeder {
  static async seed(){
    const venuesToBeSeeded = await TicketMaster.organizeVenues()

    for (const venue of venuesToBeSeeded){
      const currentVenue = await Venue.query().findOne({name: venue.name})
      if (!currentVenue){
        await Venue.query().insert(venue)
      }
    }
  }
}

export default VenueSeeder