const Model = require('./Model.js')

class Event extends Model {
  static get tableName() {
    return 'events'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'description', 'venueId'],
      properties: {
        name: {type: 'string'},
        date: {type: 'string'},
        description: {type: 'string'},
        image: {type: ['string', 'integer']},
        genre: {type: 'string'},
        priceRange: {type: 'string'},
        venueId: {type: [ 'integer', 'string']}
      }
    }
  }

  static get relationMappings() {
    const { Venue, User, Interest, Comment } = require('./index')

    return {
      venue: {
        relation: Model.BelongsToOneRelation,
        modelClass: Venue,
        join: {
          from: 'events.venueId',
          to: 'venues.id'
        }
      },
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'events.id',
          through: {
            from: 'interests.eventId',
            to: 'interests.userId'
          },
          to: 'users.id'
        }
      },
      interests: {
        relation: Model.HasManyRelation,
        modelClass: Interest,
        join: {
          from: 'events.id',
          to: 'interests.eventId'
        }
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'events.id',
          to: 'comments.eventId'
        }
      }
    }
  }
}

module.exports = Event