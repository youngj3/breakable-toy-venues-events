/* eslint-disable no-console */
import { connection } from "../boot.js"
import EventSeeder from "./seeders/EventSeeder.js"
import VenueSeeder from "./seeders/VenueSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log('seeding venues...')
    await VenueSeeder.seed()
    
    console.log('seeding events...')
    await EventSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder