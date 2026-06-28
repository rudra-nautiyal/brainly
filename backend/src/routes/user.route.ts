import express from "express";
import { UserModel } from "../models/User.model.js";

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await UserModel.findOne({
      username,
    });

    if (!existingUser) {
      await UserModel.create({
        username,
        password,
      });

      return res.status(200).json({
        message: "User Created Successfully",
      });
    } else {
      return res.status(403).json({
        message: "User already exists.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

export default userRouter;
