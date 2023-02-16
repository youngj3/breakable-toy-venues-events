import { User } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import uploadImage from "../../../services/uploadImage.js";
import { ValidationError } from 'objection'
import express from 'express'

const usersRouter = new express.Router();

usersRouter.post("/", uploadImage.single("image"), async (req, res) => {
  debugger
  const formInput = cleanUserInput(req.body)
  const { email, password, passwordConfirmation, firstName, lastName, userName} = formInput;
  let image = ""
  if (req.file) {
    image = req.file.location
  }
  console.log(req.file)
  console.log("image", image)
  console.log({ email, password, passwordConfirmation, firstName, lastName, userName})
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password, firstName, lastName, userName, image });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch(error){
    console.log(error)
    if(error instanceof ValidationError){
        return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
});


usersRouter.patch("/", uploadImage.single("image"), async(req, res) => {
	try {
		const userId = req.user.id
		const image = req.file.location
		const selectedUser = await User.query().findById(userId)
		const updatedUser = await selectedUser.$query().patchAndFetchById(userId, {image: image})
		return res.status(201).json({ updatedUser })
	} catch (error) {
		return res.status(500).json({ errors: error })
	}
})

usersRouter.get("/image", async (req, res) => {
  if (req.user) {
    const userId = req.user.id
    try {
      const user = await User.query().findById(userId)
      return res.status(200).json({ image: user.image })
    } catch(error) {
      return res.status(500).json({ errors: error })
    }
  } else {
    res.status(200).json({image: null})
  }
})

export default usersRouter;





// usersRouter.get("/:id", async (req, res) => {
//   const { id } = req.params
//   try {
//     const user = await User.query().findById(id)
//     return res.status(200).json({ user })
//   }catch(error) {
//     console.error(error)
//   }
// })