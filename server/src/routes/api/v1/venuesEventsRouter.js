import express from 'express'
import { Event } from '../../../models/index.js'
import EventSerializer from '../../../../serializers/EventSerializer.js'
import venuesEventsCommentsRouter from './venuesEventsCommentsRouter.js'
import TicketMaster from '../../../../apiClient/TicketMaster.js'
import DescriptionCreator from '../../../../apiClient/DescriptionCreator.js'

const venuesEventsRouter = new express.Router({mergeParams: true})

venuesEventsRouter.get('/:id', async (req, res) => {
  const eventId = req.params.id
  try {
    let event
    const doesItExist = await Event.query().findOne({exactId: eventId})
    if (!doesItExist) {
      event = await TicketMaster.prepareEventForShowPage(eventId)
      const description = await DescriptionCreator.attachDescription(event.name)
      event.description = description
    } else {
      event = await EventSerializer.getDetailsForEventShow(doesItExist)
    }
    return res.status(200).json({event: event})
  } catch(error) {
		res.status(500).json({ errors: error})
	}
})

venuesEventsRouter.use('/:eventId/comments', venuesEventsCommentsRouter)

export default venuesEventsRouter