import express from 'express'
import TicketMaster from '../../../../apiClient/TicketMaster.js'
import { Interest, User, Event } from '../../../models/index.js'
import DescriptionCreator from '../../../../apiClient/DescriptionCreator.js'

const interestsRouter = new express.Router()

interestsRouter.post('/', async (req, res) => {
  const eventId = req.body.eventId
  const venueId = req.body.venueId
  const userId = req.user.id
  let localEventId
  try {
    const doesItExist = await Event.query().findOne({exactId: eventId})
    if (!doesItExist) {
      const eventForInsertion = await TicketMaster.prepareEventForShowPage(eventId)
      const description = await DescriptionCreator.attachDescription(eventForInsertion.name)
      eventForInsertion.description = description
      eventForInsertion.venueId = venueId
      await Event.query().insert(eventForInsertion)
      const localEvent = await Event.query().findOne({exactId: eventId})
      localEventId = localEvent.id
    } else {
      localEventId = doesItExist.id
    }
    await Interest.query().insertAndFetch({userId: userId, eventId: localEventId})
    res.status(200).json({message: 'creation success'})
  } catch(error) {
    return res.status(500).json({errors: error})
  }
})

interestsRouter.delete('/:eventId', async (req, res) => {
  const userId = req.user.id
  const eventId = req.params.eventId
  try {
    const event = await Event.query().findOne({exactId: eventId})
    const interest = await Interest.query().findOne({userId: userId, eventId: event.id})
    await Interest.query().deleteById(interest.id)
    return res.status(204).json({message: 'deletion success'})
  } catch(error) {
		return res.status(500).json({errors: error})
	}
})

interestsRouter.get('/popular', async (req, res) => {
  const popularEvents = []
  try{
    const commonInterests = await Interest.query().select('eventId').groupBy('eventId').count('id').orderBy('count', 'desc').limit(3)
    for (const interest of commonInterests){
      const popularEvent = await Event.query().findById(interest.eventId)
      popularEvents.push(popularEvent)
    }
    res.status(200).json({popularEvents})
  } catch(error) {
		return res.status(500).json({errors: error})
	}
})

export default interestsRouter