import express from 'express'
import VenueSerializer from '../../../../serializers/VenueSerializer.js'
import { Venue } from '../../../models/index.js'
import venuesEventsRouter from './venuesEventsRouter.js'

const venuesRouter = new express.Router()

venuesRouter.get('/', async (req, res) => {
  try{
    // console.log(req.query)
    console.log("params", req.query.state)
    // console.log("req", req)
    const { state } = req.params
    const venues = await Venue.query().where('state', `${state}`)
    const serializedVenues = VenueSerializer.getDetailsForIndex(venues)
    return res.status(200).json({venues: serializedVenues})
  } catch(error) {
		res.status(500).json({ errors: error})
	}
})

venuesRouter.get('/:id', async (req,res) => {
  try{
    const venueId = req.params.id
    const venue = await Venue.query().findById(venueId)
    const serializedVenue = await VenueSerializer.getDetailsForShow(venue)
    return res.status(200).json({venue: serializedVenue})
  } catch(error) {
		res.status(500).json({ errors: error})
	}
})


venuesRouter.use('/:venueId/events', venuesEventsRouter)

export default venuesRouter