const Model = require('./Model.js')

class Venue extends Model {
  static get tableName() {
    return 'venues'
  }

  static get jsonSchema(){
    return {
      type: 'object',
      required: ['name', 'exactId', 'city', 'state', 'address', 'postalCode'],
      properties: {
        name: {type: 'string'},
        exactId: {type: 'string'},
        city: {type: 'string'},
        state: {type: 'string'},
        address: {type: 'string'},
        postalCode: {type: 'string'}
      }
    }
  }

  static get relationMappings() {
    const { Event } = require('./index')

    return {
      events: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: 'venues.id',
          to: 'events.venueId'
        }
      }
    }
  }
}

module.exports = Venue