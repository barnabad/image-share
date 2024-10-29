import { Request, Response } from "express";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

export const loadPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ message: "Posts loaded", posts });
  } catch (error) {
    res.status(400).json({ error: "Couldn't load posts" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const ownerId = req.body.ownerId;
  const caption = req.body.caption;
  const file = req.file;

  if (!file) {
    res.status(400).json({ error: "Error uploading image" });
    return;
  }

  try {
    const user = await User.findById(ownerId);

    if (!user) {
      res.status(404).json({ error: "Owner not found" });
      return;
    }

    const post = new Post({
      ownerId,
      caption,
      imageUrl: file.filename,
    });

    await post.save();
    res.status(201).json({ message: "Post uploaded" });
  } catch (error) {
    res.status(500).json({ error: "Post upload failed" });
  }
};
