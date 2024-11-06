import { Router } from "express";
const router = Router();
import ChatGroupController from "../controllers/ChatGroupController";
import AuthMiddleware from "../middleware/AuthMiddleware";

router.post("/chat-group", AuthMiddleware, ChatGroupController.store);
