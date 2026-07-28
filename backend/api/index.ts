import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "../src/db.js";
import userRouter from "../src/routes/user.route.js";
import contentRouter from "../src/routes/content.route.js";
import brainRouter from "../src/routes/brain.route.js";

const app = express();

app.use(cors());
app.use(express.json());

// Vercel functions are stateless/serverless: each invocation may hit a cold
// start, so we cache the DB connection across warm invocations instead of
// reconnecting every request.
let dbConnected = false;
app.use(async (_req, _res, next) => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
  next();
});

app.use("/api/v1", userRouter);
app.use("/api/v1", contentRouter);
app.use("/api/v1", brainRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Local dev: `vercel dev` and plain `node` both work because we only call
// listen() when this file is run directly, not when Vercel imports it as a
// serverless handler.
if (process.env.VERCEL !== "1") {
  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, () => {
    console.log("Server running on PORT:", PORT);
  });
}

export default app;
