import express from "express";
import { refreshController } from "../controllers/refresh.js";

const refreshRouter = express.Router();

refreshRouter.get("/", refreshController);

export default refreshRouter;
