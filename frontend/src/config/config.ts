import dotenv from "dotenv";

dotenv.config();

export const config = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
};
