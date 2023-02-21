const Model = require('./Model.js')

class Interest extends Model {
  static get tableName() {
    return "interests"
  }

  static get relationMappings() {
    const { Event, User } = require('./index.js')

    return {
      event: {
        relation: Model.BelongsToOneRelation,
        modelClass: Event,
        join: {
          from: 'interests.eventId',
          to: 'events.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'interests.userId',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Interest