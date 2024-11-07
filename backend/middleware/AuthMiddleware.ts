import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";
import { AuthUser } from "../custom-types";

const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    // if (authHeader == null || authHeader == undefined) {
    //   throw new Error("No authorization header");
    // }
    if (authHeader === null || authHeader === undefined) {
      res.status(401).json({ status: 401, message: "No Token Provided. Please try again later" });
      return;
    }
    const token = authHeader.split(" ")[1];
    // Verify token
    // const user = await new Promise<AuthUser>((resolve, reject) => {
    //   jwt.verify(token, config.jwtSecret!, (err, decoded) => {
    //     if (err) reject(err);
    //     else resolve(decoded as AuthUser);
    //   });
    // });
    // req.user = user;
    // next();
    jwt.verify(token, config.jwtSecret!, (err, user) => {
      if (err) {
        res.status(401).json({ status: 401, message: "Unable to verify provided token, please try again later" });
        return;
      }
      req.user = user as AuthUser;
      next();
    });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized, Error while user authorization" });
  }
};

export default AuthMiddleware;
