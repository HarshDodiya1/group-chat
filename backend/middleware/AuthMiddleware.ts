import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";

const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  if (authHeader == null || authHeader == undefined) {
    res.status(401).json({ message: "You are not authorized" });
    return;
  }
  const token = authHeader.split(" ")[1];
  // Verify token
  jwt.verify(token, config.jwtSecret!, (err, user) => {
    if (err) {
      res.status(403).json({ message: "You are not authorized" });
      return;
    }
    req.user = user as AuthUser;
    next();
  });
};

export default AuthMiddleware;
