import express from "express";
import {
  changeEmail,
  changePassword,
  changeUsername,
  getUserById,
} from "../controllers/users.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const usersRouter = express.Router();

usersRouter.use(verifyToken);

usersRouter.get("/:id", getUserById);
usersRouter.patch("/username", changeUsername);
usersRouter.patch("/email", changeEmail);
usersRouter.patch("/password", changePassword);

export default usersRouter;
