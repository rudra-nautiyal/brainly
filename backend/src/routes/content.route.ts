import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  contentSchema,
  updateContentSchema,
} from "../validators/content.validator.js";
import { ContentModel } from "../models/Content.model.js";

const contentRouter = express.Router();

contentRouter.post("/content", authMiddleware, async (req, res) => {
  try {
    const result = contentSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues.map((issue) => issue.message),
      });
    }

    const { link, type, title, note, tags } = result.data;
    const userId = req.userId;

    await ContentModel.create({
      link,
      type,
      title,
      note: note ?? "",
      tags: tags ?? [],
      userId,
    });

    return res.status(201).json({
      message: "Content added.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

contentRouter.get("/content", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    const content = await ContentModel.find({
      userId,
    }).populate("userId", "username");

    return res.status(200).json({
      content,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

contentRouter.patch("/content/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const result = updateContentSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues.map((issue) => issue.message),
      });
    }

    const updated = await ContentModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: result.data },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({
        message: "Content not found.",
      });
    }

    return res.status(200).json({
      message: "Content updated.",
      content: updated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

contentRouter.delete("/content/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const result = await ContentModel.deleteOne({
      _id: id,
      userId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Content not found.",
      });
    }

    return res.status(200).json({
      message: "Content deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

export default contentRouter;
