import express from 'express'
import { Event } from '../../../models/index.js'
import EventSerializer from '../../../../serializers/EventSerializer.js'
import venuesEventsCommentsRouter from './venuesEventsCommentsRouter.js'

const venuesEventsRouter = new express.Router({mergeParams: true})

venuesEventsRouter.get('/:id', async (req, res) => {
  const eventId = req.params.id
  try {
    const event = await Event.query().findById(eventId)
    const serializedEvent = await EventSerializer.getDetailsForEventShow(event)
    return res.status(200).json({event: serializedEvent})
  } catch(error) {
		res.status(500).json({ errors: error})
	}
})

venuesEventsRouter.use('/:eventId/comments', venuesEventsCommentsRouter)

export default venuesEventsRouter