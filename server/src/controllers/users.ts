import { Request, Response } from "express";
import { User } from "../models/user.model.js";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      message: "Successfully fetched user",
      user: { _id: user?._id, username: user?.username, email: user?.email },
    });
  } catch (error) {
    res.status(400).json({ error: "Couldn't fetch user" });
  }
};

export const changeUsername = async (req: Request, res: Response) => {
  const { userId, newUsername } = req.body;

  if (!userId || !newUsername) {
    res.status(400).json({ error: "Missing data" });
    return;
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({ error: "No user found" });
      return;
    }

    if (user.username === newUsername) {
      res.status(204).json({ message: "Username already up-to-date" });
    }

    user.username = newUsername;
    await user.save();

    res.status(200).json({ message: "Username updated" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const changeEmail = async (req: Request, res: Response) => {};

export const changePassword = async (req: Request, res: Response) => {};
