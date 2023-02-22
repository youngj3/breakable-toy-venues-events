import express from "express";
import { Comment } from "../../../models/index.js";
import { ValidationError } from 'objection';
import cleanUserInput from "../../../services/cleanUserInput.js";
import CommentSerializer from '../../../../serializers/CommentSerializer.js'

const venuesEventsCommentsRouter = new express.Router({mergeParams: true})

venuesEventsCommentsRouter.patch('/:commentId', async (req, res) => {
  const body = req.body
  // const userId = req.user.id
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

export default venuesEventsCommentsRouter