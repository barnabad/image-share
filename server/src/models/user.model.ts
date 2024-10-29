import { model, Schema } from "mongoose";

interface IUser {
  email: string;
  username: string;
  password: string;
  avatarUrl?: string;
  refreshToken?: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
