import { Request, Response } from "express";
import { User } from "../models/user.model.js";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res
      .status(200)
      .json({ message: "Successfully fetched user", username: user?.username });
  } catch (error) {
    res.status(400).json({ error: "Couldn't fetch user" });
  }
};
