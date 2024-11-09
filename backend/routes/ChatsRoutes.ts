import { Router } from "express";
import ChatsController from "../controllers/ChatsController";

const router = Router();

router.get("/chats/:groupId", ChatsController.index);

export { router as ChatsRoutes };
