import express from 'express'
import { Event } from '../../../models/index.js'
import EventSerializer from '../../../../serializers/EventSerializer.js'

const venuesEventsRouter = new express.Router({mergeParams: true})

venuesEventsRouter.get('/:id', async (req, res) => {
  console.log('params', req.params)
  const eventId = req.params.id
  console.log(eventId)
  try {
    const event = await Event.query().findById(eventId)
    const serializedEvent = await EventSerializer.getDetailsForEventShow(event)
    console.log(serializedEvent)
    return res.status(200).json({event: serializedEvent})
  } catch(error) {
    console.log(error)
		res.status(500).json({ errors: error})
	}
})

export default venuesEventsRouter