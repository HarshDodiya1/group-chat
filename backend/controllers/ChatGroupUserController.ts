import { Request, Response } from "express";
import db from "../db/db";

interface GroupUserType {
  name: string;
  group_id: string;
}

class ChatGroupUserController {
  static async index(req: Request, res: Response): Promise<void> {
    try {
      const { group_id } = req.query;
      const users = await db.groupUsers.findMany({
        where: {
          group_id: group_id as string,
        },
      });

      res.json({ message: "data fetched successfully!", data: users });
      return;
    } catch (error) {
      // Handle the error response without returning it
      res
        .status(500)
        .json({ message: "Something went wrong while logging in", error });
    }
    return;
  }

  static async store(req: Request, res: Response): Promise<void> {
    try {
      const body: GroupUserType = req.body;
      const user = await db.groupUsers.create({
        data: body,
      });
      res.json({ message: "User created successfully!", data: user });
      return;
    } catch (error) {
      // Handle the error response without returning it
      res
        .status(500)
        .json({ message: "Something went wrong while logging in", error });
    }
    return;
  }
}

export default ChatGroupUserController;
