import mongoose from "mongoose";

export async function connectDB() {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error("MONGO_URI has not been provided.");
    }

    await mongoose.connect(MONGO_URI);
    console.log("Database connected.");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}
