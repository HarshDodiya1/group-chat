import express, { Request, Response } from "express";
const router = express.Router();

import { config } from "../config/config";

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the Backend APIs",
    creator: "Harsh Dodiya",
    LinkedIn: config.linkedIn || "Harsh Dodiya",
    GitHub: config.github || "Harsh Dodiya",
  });
});


export { router as defaultRoute };