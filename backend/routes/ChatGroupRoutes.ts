import { Router } from "express";
import ChatGroupController from "../controllers/ChatGroupController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = Router();

router
  .post(
    "/chat-group",
    AuthMiddleware,
    ChatGroupController.createChatGroup as any,
  )
  .get(
    "/chat-group",
    AuthMiddleware,
    ChatGroupController.fetchAllChatGroupsByUserId as any,
  )
  .get(
    "/chat-group/:id",
    AuthMiddleware,
    ChatGroupController.fetchChatGroupById,
  )
  .put("/chat-group/:id", AuthMiddleware, ChatGroupController.updateChatGroup)
  .delete(
    "/chat-group/:id",
    AuthMiddleware,
    ChatGroupController.deleteChatGroup,
  );

export { router as chatRoute };
