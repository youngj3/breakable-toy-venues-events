import express from "express";
import { Comment } from "../../../models/index.js";
import { ValidationError } from 'objection';
import cleanUserInput from "../../../services/cleanUserInput.js";
import CommentSerializer from '../../../../serializers/CommentSerializer.js'

const venuesEventsCommentsRouter = new express.Router({mergeParams: true})

venuesEventsCommentsRouter.post('/', async (req, res) => {
  const body = req.body
  body.eventId = req.params.eventId
  body.userId = req.user.id
  const formInput = cleanUserInput(body)
  try {
    const newComment = await Comment.query().insertAndFetch(formInput)
    const serializedComment = await CommentSerializer.getDetail(newComment)
    return res.status(201).json({newComment: serializedComment})
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