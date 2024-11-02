import mongoose, { model, Schema } from "mongoose";

interface IPost {
  ownerId: mongoose.Types.ObjectId;
  caption?: string;
  imageUrl: string;
  likes?: string[];
}

const postSchema = new Schema<IPost>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    caption: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
    },
  },
  { timestamps: true }
);

export const Post = model<IPost>("Post", postSchema);
