import express from "express";
import authRouter from "./routes/auth.js";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import bodyParser from "body-parser";
import cors from "cors";
import corsConfig from "./config/corsConfig.js";
import postsRouter from "./routes/posts.js";
import cookieParser from "cookie-parser";
import refreshRouter from "./routes/refresh.js";
import usersRouter from "./routes/users.js";

const app = express();

// Load enviroment variables
dotenv.config();

// Connect to MongoDB database
connectDB();

// Serve public folder
app.use(express.static("./uploads"));

// Middlewares
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/refresh", refreshRouter);
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

app.listen(3000, () => console.log("Server listening on port 3000..."));
