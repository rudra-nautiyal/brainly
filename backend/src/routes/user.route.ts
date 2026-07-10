import express from "express";
import { UserModel } from "../models/User.model.js";
import { signinSchema, signupSchema } from "../validators/user.validator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

userRouter.post("/signup", async (req, res) => {
  try {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues.map((issue) => issue.message),
      });
    }

    const { username, password } = result.data;

    const user = await UserModel.findOne({
      username,
    });

    if (user) {
      return res.status(409).json({
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User Created Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const result = signinSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues.map((issue) => issue.message),
      });
    }

    const { username, password } = result.data;

    const user = await UserModel.findOne({
      username,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      message: "Login successful.",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

export default userRouter;
