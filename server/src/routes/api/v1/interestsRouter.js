import express from 'express'
import { Interest, User } from '../../../models/index.js'

const interestsRouter = new express.Router()

interestsRouter.post('/', async (req, res) => {
  const { body } = req
  body.userId = req.user.id
  try {
    const newInterest = await Interest.query().insertAndFetch(body)
    res.status(200).json({message: 'creation success'})
  } catch(error) {
    return res.status(500).json({errors: error})
  }
})

interestsRouter.get('/', async (req, res) => {
  const userId = req.user.id
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
export default interestsRouter