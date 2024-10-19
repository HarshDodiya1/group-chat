import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config/config";

const app = express();

dotenv.config();

// CORS Configuration
app.use(
  cors({
    origin: [config.cors_origin1, config.cors_origin2],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Body parsers
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

// Static folder
app.use(express.static("public"));

// Cookie parser
app.use(cookieParser());

// Imported Routes
// Example: app.use('/api/users', userRoutes);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the Backend APIs",
    creator: "Harsh Dodiya",
    LinkedIn: config.linkedIn || "Harsh Dodiya",
    GitHub: config.github || "Harsh Dodiya",
  });
});

// Server listener
const port = config.port || 3000;
app.listen(port, () => {
  console.log(`⚙️  Server is running at port: ${config.port}`);
});
