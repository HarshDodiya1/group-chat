import dotenv from "dotenv";

dotenv.config();

export const config = {
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
};
