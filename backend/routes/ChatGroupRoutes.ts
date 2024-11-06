import { Router } from "express";
import ChatGroupController from "../controllers/ChatGroupController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = Router();

router.post("/chat-group", AuthMiddleware, ChatGroupController.store as any);

export { router as chatRoute };

