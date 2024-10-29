import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const DB_URI = process.env.MONGO_DB as string;
    await mongoose.connect(DB_URI);
    console.log("Connected to database.");
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
    } else {
      console.error("An unknown error occurred");
    }
    process.exit(1);
  }
};
