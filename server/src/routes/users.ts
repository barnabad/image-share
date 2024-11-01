import express from "express";
import { refreshController } from "../controllers/refresh.js";
import { getUserById } from "../controllers/users.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const usersRouter = express.Router();

usersRouter.use(verifyToken);

usersRouter.get("/:id", getUserById);

export default usersRouter;
