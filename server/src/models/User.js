/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "firstName", "lastName", "userName"],

      properties: {
        email: { type: "string" },
        cryptedPassword: { type: "string" },
        firstName: {type: "string"},
        lastName: {type: "string"},
        userName: {type: "string"},
        image: {type: "string"}
      },
    };
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }

  static get relationMappings() {
    const { Event, Interest } = require('./index.js')

    return {
      events: {
        relation: Model.ManyToManyRelation,
        modelClass: Event,
        join: {
          from: 'users.id',
          through: {
            from: 'interests.userId',
            to: 'interests.eventId'
          },
          to: 'events.id'
        }
      },
      interests: {
        relation: Model.HasManyRelation,
        modelClass: Interest,
        join: {
          from: 'users.id',
          to: 'interests.userId'
        }

      }
    }
  }
}

module.exports = User;
