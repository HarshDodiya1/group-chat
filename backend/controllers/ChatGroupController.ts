import { Request, Response } from "express";
import { AuthUser } from "../custom-types";
import db from "../db/db";

interface AuthenticatedRequest extends Request {
  user: AuthUser; // Not optional since we use auth middleware
}

class ChatGroupController {
  static async fetchAllChatGroupsByUserId(
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> {
    try {
      const fetchedChatGroups = await db.chatGroup.findMany({
        where: {
          user_id: req.user.id,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      res.json({
        message: "Chat Groups are fetched successfully by userId!",
        data: fetchedChatGroups,
      });
      return;
    } catch (error) {
      console.error("Error while fetching chat groups by userId:", error);
      res.status(500).json({
        message:
          "Something went wrong while fetching the chat groups by userId",
      });
      return;
    }
  }

  static async createChatGroup(
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> {
    try {
      const { title, passcode } = req.body;

      const chatGroupData = await db.chatGroup.create({
        data: {
          title,
          passcode,
          user_id: req.user.id,
        },
      });

      const { passcode: string, ...chatGroupDataWithoutPasscode } =
        chatGroupData;

      res.json({
        message: "Chat Group created successfully!",
        data: chatGroupDataWithoutPasscode,
      });
      return;
    } catch (error) {
      console.error("Error creating chat group:", error);
      res.status(500).json({
        message: "Something went wrong while creating chat group",
      });
      return;
    }
  }

  static async fetchChatGroupById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const fetchedChatGroup = await db.chatGroup.findUnique({
        where: {
          id: id,
        },
      });

      res.json({
        message: "Chat Group fetched successfully by group_id!",
        data: fetchedChatGroup,
      });
      return;
    } catch (error) {
      console.error("Error while fetching chat groups by group_id:", error);
      res.status(500).json({
        message:
          "Something went wrong while fetching the chat groups by group_id",
      });
      return;
    }
  }

  static async updateChatGroup(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateChatGroup = await db.chatGroup.update({
        data: body,
        where: {
          id: id,
        },
      });

      res.json({
        message: "Chat Group updated successfully!",
        data: updateChatGroup,
      });
      return;
    } catch (error) {
      console.error("Error while updating chat group", error);
      res.status(500).json({
        message:
          "Something went wrong while updating chat group, please try again later",
      });
      return;
    }
  }

  static async deleteChatGroup(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedChatGroup = await db.chatGroup.delete({
        where: {
          id: id,
        },
      });

      res.json({
        message: "Chat Group deleted successfully!",
        data: deletedChatGroup,
      });
      return;
    } catch (error) {
      console.error("Error while deleting chat group", error);
      res.status(500).json({
        message:
          "Something went wrong while deleting chat group, please try again later",
      });
      return;
    }
  }
}

export default ChatGroupController;
