import express from "express";
import "dotenv/config";
import { connectDB } from "./db.js";
import userRouter from "./routes/user.route.js";
import contentRouter from "./routes/content.route.js";
import brainRouter from "./routes/brain.route.js";

const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json());

app.use("/api/v1", userRouter);
app.use("/api/v1", contentRouter);
app.use("/api/v1", brainRouter);

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log("Server running on PORT:", PORT);
  });
}

startServer();
