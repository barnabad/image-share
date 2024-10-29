import express from "express";
import { refreshController } from "../controllers/refresh.js";
import { getUserById } from "../controllers/users.js";

const usersRouter = express.Router();

usersRouter.get("/:id", getUserById);

export default usersRouter;
