import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";
import { AuthUser } from "../custom-types";

const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader == null || authHeader == undefined) {
      throw new Error("No authorization header");
    }
    const token = authHeader.split(" ")[1];
    // Verify token
    const user = await new Promise<AuthUser>((resolve, reject) => {
      jwt.verify(token, config.jwtSecret!, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded as AuthUser);
      });
    });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default AuthMiddleware;