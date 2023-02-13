import express from 'express'
import VenueSerializer from '../../../../serializers/VenueSerializer.js'
import { Venue } from '../../../models/index.js'

const venuesRouter = new express.Router()

venuesRouter.get('/', async (req, res) => {
  try{
    const venues = await Venue.query()
    const serializedVenues = VenueSerializer.getDetailsForIndex(venues)
    return res.status(200).json({venues: serializedVenues})
  } catch(error) {
    console.log(error)
		res.status(500).json({ errors: error})
	}
})

export default venuesRouter