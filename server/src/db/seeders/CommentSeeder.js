import { Comment, Event, User } from '../../models/index.js'
import { faker } from '@faker-js/faker'

class CommentSeeder {
  static async seed(commentsPerPage){
    const events = await Event.query()
    const users = await User.query()
    const commentsToSeed = []

    const sentences = [
      "Holy cow I cant believe they are coming to town!",
      "Went to a show back in '08, did NOT disappoint",
      "Been waiting for them to come to town!",
      "oh baby, lets go!",
      "cannot express my joy over this!",
      "I'm over the moon that they're finally coming to town!",
      "I've been counting down the days until this concert!",
      "This is a dream come true!",
      "I'm absolutely thrilled to see them perform live!",
      "I'm beyond excited for this concert!",
      "I'm on cloud nine knowing I get to see them in concert!",
      "This is the concert of a lifetime and I can't wait!",
      "My heart is racing with excitement for this concert!",
      "I'm bursting with anticipation for this concert!",
      "I'm so hyped for this concert, I can hardly contain myself!"
    ]

    for (const event of events) {
      for (let i = 0; i < commentsPerPage; i++) {
        const comment = {
          eventId: event.id,
          userId: users[i].id,
          text: faker.helpers.arrayElement(sentences)
        }
        commentsToSeed.push(comment)
      }
    }

    for (const comment of commentsToSeed) {
      const currentComment = await Comment.query().findOne({eventId: comment.eventId, userId: comment.userId, text: comment.text})
      if (!currentComment) {
        await Comment.query().insert(comment)
      }
    }
  }
}

export default CommentSeeder