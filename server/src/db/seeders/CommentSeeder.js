import { Comment, Event, User } from '../../models/index.js'

class CommentSeeder {
  static async seed(commentsPerPage){
    const events = await Event.query()
    const users = await User.query()
    const commentsToSeed = []

    if (commentsPerPage > users.length) {
      commentsPerPage = users.length
    }

    const sentences = [
      "Holy cow I cant believe they are coming to town!",
      "Went to a show back in '08, did NOT disappoint",
      "Been waiting for them to come to town!",
      "oh baby, lets go!",
      "cannot express my joy over this!"
    ]

    for (const event of events) {
      for (let i = 0; i < commentsPerPage; i++) {
        const comment = {
          eventId: event.id,
          userId: users[i].id,
          text: sentences[i]
        }
        console.log(comment)
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