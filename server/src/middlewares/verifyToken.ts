import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).json({ error: "No authorozation header provided" });
    return;
  }

  const token = authHeader.split(" ")[1]; // Bearer [TOKEN]

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
    if (err) {
      res.status(403).json({ error: "Invalid token" });
      return;
    }

    // Set data for further use
    req.username = (decoded as { username: string }).username;
    req._id = (decoded as { _id: string })._id;
    next();
  });
};
