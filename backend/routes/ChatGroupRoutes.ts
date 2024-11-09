import { Router } from "express";
import ChatGroupController from "../controllers/ChatGroupController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = Router();

router.post(
  "/chat-group",
  AuthMiddleware,
  ChatGroupController.createChatGroup as any,
);

router.get(
  "/chat-group",
  AuthMiddleware,
  ChatGroupController.fetchAllChatGroupsByUserId as any,
);
router.get("/chat-group/:id", ChatGroupController.fetchChatGroupById);

router.put(
  "/chat-group/:id",
  AuthMiddleware,
  ChatGroupController.updateChatGroup,
);
router.delete(
  "/chat-group/:id",
  AuthMiddleware,
  ChatGroupController.deleteChatGroup,
);

export { router as chatRoute };
