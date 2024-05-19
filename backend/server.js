import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import quizRouter from "./routes/quizRoute.js";
import leaderboardRoutes from "./routes/leaderboardRoute.js";

import "dotenv/config";

// app config
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

//Db Connection
connectDB();

//api endpoint
app.use("/api/user", userRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/leaderboard", leaderboardRoutes);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log("Server is running on" + port);
});

//
