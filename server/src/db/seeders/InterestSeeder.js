import { Interest, Event, User } from '../../models/index.js'

class InterestSeeder {
  static async seed(){
    const events = await Event.query()
    const users = await User.query()
    const interestsForInsertion = []
    for (const user of users) {
      for (let i = 0; i < events.length; i++){
        const interest = {
          userId: user.id,
          eventId: events[i].id
        }
        interestsForInsertion.push(interest)
      }
    }

    for (const interest of interestsForInsertion){
      const currentInterest = await Interest.query().findOne({userId: interest.userId, eventId: interest.eventId})
      if (!currentInterest) {
        await Interest.query().insert(interest)
      }
    }
  }
}

export default InterestSeeder