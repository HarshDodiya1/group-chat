import { Router } from "express";
import ChatGroupUserController from "../controllers/ChatGroupUserController";

const router = Router();

router
  .get("/chat-group-user", ChatGroupUserController.index)
  .post("/chat-group-user", ChatGroupUserController.store);

export { router as chatGroupUserRoutes };
