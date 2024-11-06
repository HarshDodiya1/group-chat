import { Request, Response } from "express";
import { AuthUser } from "../custom-types";
import db from "../db/db";

interface AuthenticatedRequest extends Request {
  user: AuthUser; // Not optional since we use auth middleware
}

class ChatGroupController {
  static async store(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { title, passcode } = req.body;

      await db.chatGroup.create({
        data: {
          title,
          passcode,
          user_id: req.user.id,
        },
      });

      res.json({ message: "Chat Group created successfully!" });
      return;
    } catch (error) {
      console.error("Error creating chat group:", error);
      res.status(500).json({
        message: "Something went wrong while creating chat group",
      });
      return;
    }
  }
}

export default ChatGroupController;
