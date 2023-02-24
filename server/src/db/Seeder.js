/* eslint-disable no-console */
import { connection } from "../boot.js"
import EventSeeder from "./seeders/EventSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"
import InterestSeeder from "./seeders/InterestSeeder.js"
import CommentSeeder from "./seeders/CommentSeeder.js"

class Seeder {
  static async seed() {

    const usersToSeed = 5
    const commentsPerPage = 5

    console.log('seeding users...')
    await UserSeeder.seed(usersToSeed)
    
    console.log('seeding events...')
    await EventSeeder.seed()

    console.log('seeding interests...')
    await InterestSeeder.seed()

    console.log('seeding comments...')
    await CommentSeeder.seed(commentsPerPage)

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder