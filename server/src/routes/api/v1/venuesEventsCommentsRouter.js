import express from "express";
import { Comment, Event } from "../../../models/index.js";
import { ValidationError } from 'objection';
import TicketMaster from '../../../../apiClient/TicketMaster.js'
import DescriptionCreator from "../../../../apiClient/DescriptionCreator.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import CommentSerializer from '../../../../serializers/CommentSerializer.js'
import EventSerializer from "../../../../serializers/EventSerializer.js";

const venuesEventsCommentsRouter = new express.Router({mergeParams: true})

venuesEventsCommentsRouter.post('/', async (req, res) => {
  const body = req.body
  body.userId = req.user.id
  const eventId = req.params.eventId
  const venueId = req.params.venueId
  const formInput = cleanUserInput(body)
  let localEvent
  try {
    const doesItExist = await Event.query().findOne({exactId: eventId})
    if (!doesItExist) {
      const eventForInsertion = await TicketMaster.prepareEventForShowPage(eventId)
      const description = await DescriptionCreator.attachDescription(eventForInsertion.name)
      eventForInsertion.description = description
      eventForInsertion.venueId = venueId
      await Event.query().insert(eventForInsertion)
      localEvent = await Event.query().findOne({exactId: eventId})
    } else {
      localEvent = doesItExist
    }
    formInput.eventId = localEvent.id
    const eventToSend = await EventSerializer.getDetailsForEventShow(localEvent)
    const newComment = await Comment.query().insertAndFetch(formInput)
    const serializedComment = await CommentSerializer.getDetail(newComment)
    return res.status(201).json({newComment: serializedComment, event: eventToSend})
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

venuesEventsCommentsRouter.patch('/:commentId', async (req, res) => {
  const body = req.body
  body.id = req.params.commentId
  const formInput = cleanUserInput(body)
  try{
    const freshlyEditedComment = await Comment.query().patchAndFetchById(formInput.id, {
      text: formInput.text
    })
    const serializedEditedComment = await CommentSerializer.getDetail(freshlyEditedComment)
    return res.status(201).json({editedComment: serializedEditedComment})
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({errors: error})
  }
})

venuesEventsCommentsRouter.delete('/:commentId', async (req, res) => {
  try {
    await Comment.query().deleteById(req.params.commentId)
    return res.status(204).json({message: 'deletion success'})
  } catch(error) {
		return res.status(500).json({errors: error})
	}
})

export default venuesEventsCommentsRouter