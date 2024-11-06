import { Request, Response } from "express";
import db from "../db/db";

class ChatGroupController {
  static async store(req: Request, res: Response) {
    try {
      const body = req.body;
      const user = req.user!;
      await db.chatGroup.create({
        data: {
          title: body?.title,
          passcode: body?.passcode,
          user_id: user.id,
        },
      });
       res.json({ message: "Chat Group created successfully!" });
    } catch (error) {
      console.log("This is the error while creating chat group: ", error);
       res.status(500).json({
        message: "Something went wrong while creating chat group",
        error,
      });
    }
  }
}

export default ChatGroupController;
