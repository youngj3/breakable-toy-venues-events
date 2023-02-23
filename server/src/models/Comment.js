const Model = require('./Model.js')

class Comment extends Model {
  static get tableName() {
    return 'comments'
  }

  static get jsonSchema() {
    return { 
      type: 'object',
      required: ['eventId', 'userId', 'text'],
      properties: {
        text: {type: 'string'},
        eventId: {type: [ 'integer', 'string']},
        userId: {type: [ 'integer', 'string']}
      }
    }
  }

  static get relationMappings() {
    const { User, Event } = require('./index')

    return {
      event: {
        relation: Model.BelongsToOneRelation,
        modelClass: Event,
        join: {
          from: 'comments.eventId',
          to: 'events.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'comments.userId',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Comment