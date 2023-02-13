import express from 'express'
import Venue from '../../../models/index.js'

const venuesRouter = new express.Router()

venuesRouter.get('/', async (req, res) => {
  try{
    const venues = await Venue.query()
    return res.status(200).json({venues})
  } catch(error) {
		res.status(500).json({ errors: error})
	}
})

export default venuesRouter