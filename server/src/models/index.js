// include all of your models here using CommonJS requires
const User = require("./User.js")
const Venue = require('./Venue.js')
const Event = require('./Event.js')
const Interest = require('./Interest.js')
const Comment = require('./Comment.js')

module.exports = {User, Venue, Event, Interest, Comment};
