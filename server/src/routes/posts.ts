import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createPost, loadPosts } from "../controllers/posts.js";
import { upload } from "../middlewares/multer.js";

const postsRouter = express.Router();

postsRouter.use(verifyToken);

postsRouter.get("/", loadPosts);
postsRouter.post("/", upload.single("file-upload"), createPost);

export default postsRouter;
