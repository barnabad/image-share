import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { createAccessToken } from "../utils/createTokens.js";

export const refreshController = async (req: Request, res: Response) => {
  if (!req.cookies?.jwt) {
    res.status(401).json({ error: "No refresh token cookie provided" });
    return;
  }

  const refreshToken = req.cookies.jwt;

  const user = await User.findOne({ refreshToken: refreshToken });

  if (!user) {
    res.status(403).json({ error: "Invalid refresh token" });
    return;
  }

  // Evaluate token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!,
    (err: any, decoded: any) => {
      if (err || user._id.toString() !== decoded._id) {
        res.status(403).json({ error: "Invalid refresh token" });
        return;
      }

      const accessToken = createAccessToken(decoded._id);

      res.json({ accessToken, _id: user._id });
    }
  );
};
