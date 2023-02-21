import express from 'express'
import { Interest, User, Event } from '../../../models/index.js'

const interestsRouter = new express.Router()

interestsRouter.post('/', async (req, res) => {
  const { body } = req
  body.userId = req.user.id
  try {
    await Interest.query().insertAndFetch(body)
    res.status(200).json({message: 'creation success'})
  } catch(error) {
    return res.status(500).json({errors: error})
  }
})

interestsRouter.get('/', async (req, res) => {
  if(req.user){
    const userId = req.user.id
  }
  try {
    const user = await User.query().findById(userId)
    const savedEvents = await user.$relatedQuery('events')
    return res.status(200).json({savedEvents: savedEvents})
  } catch(error) {
    return res.status(500).json({errors: error})
  }
})

interestsRouter.delete('/:eventId', async (req, res) => {
  const userId = req.user.id
  const eventId = req.params.eventId
  try {
    const interest = await Interest.query().findOne({userId: userId, eventId: eventId})
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