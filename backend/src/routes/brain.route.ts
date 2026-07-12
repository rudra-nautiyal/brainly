import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { LinkModel } from "../models/Link.model.js";
import { ContentModel } from "../models/Content.model.js";
import { UserModel } from "../models/User.model.js";
import { generateHash } from "../utils.js";
import { shareSchema } from "../validators/link.validator.js";

const brainRouter = express.Router();

brainRouter.post("/brain/share", authMiddleware, async (req, res) => {
  try {
    const result = shareSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues.map((issue) => issue.message),
      });
    }

    const { share } = result.data;
    const userId = req.userId;

    if (!share) {
      await LinkModel.deleteOne({
        userId,
      });

      return res.status(200).json({
        message: "Sharing disabled.",
      });
    }

    const existingLink = await LinkModel.findOne({
      userId,
    });

    if (existingLink) {
      return res.status(200).json({
        hash: existingLink.hash,
      });
    }

    const hash = generateHash(10);

    await LinkModel.create({
      hash,
      userId,
    });

    return res.status(201).json({
      hash,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

brainRouter.get("/brain/:shareLink", async (req, res) => {
  try {
    const { shareLink } = req.params;

    const link = await LinkModel.findOne({
      hash: shareLink,
    });

    if (!link) {
      return res.status(404).json({
        message: "Share link not found.",
      });
    }

    const user = await UserModel.findById(link.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const content = await ContentModel.find({
      userId: link.userId,
    });

    return res.status(200).json({
      username: user.username,
      content,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

export default brainRouter;
