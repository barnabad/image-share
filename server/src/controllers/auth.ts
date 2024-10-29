import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  createAccessToken,
  createRefreshToken,
} from "../utils/createTokens.js";

export const signupController = async (req: Request, res: Response) => {
  const { email, username, password, confirmPassword } = req.body;

  // Check if all data is provided
  if (!email || !username || !password) {
    res.status(400).json({ error: "Missing data" });
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    res.status(400).json({ error: "Passwords don't match" });
    return;
  }

  try {
    // Check if email is already in use
    const existingUserEmail = await User.findOne({ email: email });

    if (existingUserEmail) {
      res.status(409).json({ error: "Email already in use" });
      return;
    }

    // Check if username is already in use
    const existingUserName = await User.findOne({ username: username });

    if (existingUserName) {
      res.status(409).json({ error: "Username already in use" });
      return;
    }

    // Sign up new user
    const hash = bcrypt.hashSync(password, 8);

    const newUser = new User({
      email: email,
      username: username,
      password: hash,
    });
    await newUser.save();

    res.status(201).json({ message: "Sign up successful" });
  } catch (error) {
    console.error("Error while signing up", error);
    res.status(500).json({ error: "Server error. Please try again later" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Check is all data is provided
  if (!username || !password) {
    res.status(400).json({ error: "Missing data" });
    return;
  }

  try {
    const user = await User.findOne({ username: username });

    // Check if username exists
    if (!user) {
      res.status(400).json({ error: "Bad credentials" });
      return;
    }

    // Check if password is correct
    const isCorrect = bcrypt.compareSync(password, user.password);

    if (!isCorrect) {
      res.status(400).json({ error: "Bad credentials" });
      return;
    }

    // Create JWTs
    const accessToken = createAccessToken(user._id.toString(), user.username);
    const refreshToken = createRefreshToken(user._id.toString(), user.username);

    // Store refresh token in database
    user.refreshToken = refreshToken;
    await user.save();

    // Set refresh token cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      /*sameSite: "none",
      secure: true,*/
      maxAge: 1000 * 60 * 15, // 15min
    });

    res.status(200).json({
      message: "Login successful",
      accessToken: accessToken,
      username: username,
    });
  } catch (error) {
    console.error("Error while logging in", error);
    res.status(500).json({ error: "Server error. Please try again later" });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  // TODO: Client -> delete access token from memory

  if (!req.cookies?.jwt) {
    res.sendStatus(204);
    return;
  }

  const refreshToken = req.cookies.jwt;

  const user = await User.findOne({ refreshToken: refreshToken });

  if (!user) {
    res.clearCookie("jwt", {
      httpOnly: true /*sameSite: "none", secure: true*/,
    });
    res.sendStatus(204);
    return;
  }

  user.refreshToken = undefined;
  await user.save();

  res.clearCookie("jwt", { httpOnly: true /*sameSite: "none", secure: true*/ });
  res.sendStatus(204);
};
