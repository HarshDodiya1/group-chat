import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import db from "../db/db";

interface LoginData {
  name: string;
  email: string;
  oauth_id: string;
  provider: string;
  image?: string;
}

class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const data: LoginData = req.body;

      // Check if the user already exists
      let findUser = await db.user.findUnique({
        where: {
          email: data.email,
        },
      });

      // If user doesn't exist, create a new one
      if (!findUser) {
        findUser = await db.user.create({
          data: data,
        });
      }

      // Prepare the JWT payload
      const JWTPayload = {
        name: findUser.name,
        email: findUser.email,
        id: findUser.id,
      };

      // Generate the token with a 1-year expiration
      const token = jwt.sign(JWTPayload, config.jwtSecret!, {
        expiresIn: "365d",
      });

      // Send the response without returning it
      res.json({
        message: "Logged in successfully!",
        user: {
          ...findUser,
          token: `Bearer ${token}`,
        },
      });
      return;
    } catch (error) {
      // Handle the error response without returning it
      res
        .status(500)
        .json({ message: "Something went wrong while logging in", error });
    }
    return;
  }
}

export default AuthController;
