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

      const chatGroupData = await db.chatGroup.create({
        data: {
          title,
          passcode,
          user_id: req.user.id,
        },
      });

      const { passcode: string, ...data } = chatGroupData;

      res.json({ message: "Chat Group created successfully!", data });
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
