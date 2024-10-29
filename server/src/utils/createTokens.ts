import jwt from "jsonwebtoken";

export const createAccessToken = (_id: string, username: string) => {
  const token = jwt.sign({ _id, username }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "10s",
  });

  return token;
};

export const createRefreshToken = (_id: string, username: string) => {
  const token = jwt.sign({ _id, username }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "15min",
  });

  return token;
};
