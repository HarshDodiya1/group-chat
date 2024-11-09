import { Request, Response } from "express";
import db from "../db/db";

class ChatsController {
  static async index(req: Request, res: Response): Promise<void> {
    const { groupId } = req.params;
    const chats = await db.chats.findMany({
      where: {
        group_id: groupId,
      },
    });
    res.json({ data: chats });
    return;
  }
}

export default ChatsController;
