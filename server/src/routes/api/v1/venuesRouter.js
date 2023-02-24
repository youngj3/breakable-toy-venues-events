import express from 'express'
import TicketMaster from '../../../../apiClient/TicketMaster.js'
import VenueSerializer from '../../../../serializers/VenueSerializer.js'
import { Venue } from '../../../models/index.js'
import venuesEventsRouter from './venuesEventsRouter.js'

const venuesRouter = new express.Router()

venuesRouter.get('/', async (req, res) => {
  try{
    const { state } = req.query
    const venues = await TicketMaster.organizeVenues(state)
    return res.status(200).json({venues: venues})
  } catch(error) {
		res.status(500).json({ errors: error})
	}
})

venuesRouter.get('/:id', async (req,res) => {
  try{
    const venueId = req.params.id
    const venue = await TicketMaster.prepareVenueForShowPage(venueId)
    const events = await TicketMaster.organizeRelatedEvents(venueId)
    venue.events = events
    return res.status(200).json({venue: venue})
  } catch(error) {
		res.status(500).json({ errors: error})
	}
})


venuesRouter.use('/:venueId/events', venuesEventsRouter)

export default venuesRouter