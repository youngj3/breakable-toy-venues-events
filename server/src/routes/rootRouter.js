import express from "express";
import interestsRouter from "./api/v1/interestsRouter.js";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import venuesRouter from "./api/v1/venuesRouter.js";
import clientRouter from "./clientRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/venues", venuesRouter);
rootRouter.use("/api/v1/interests", interestsRouter);

export default rootRouter;
