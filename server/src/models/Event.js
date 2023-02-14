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
        image: {type: 'string'},
        genre: {type: 'string'},
        priceRange: {type: 'string'},
        venueId: {type: [ 'integer', 'string']}
      }
    }
  }

  static get relationMappings() {
    const { Venue } = require('./index')

    return {
      venue: {
        relation: Model.BelongsToOneRelation,
        modelClass: Venue,
        join: {
          from: 'events.venueId',
          to: 'venues.id'
        }
      }
    }
  }
}

module.exports = Event