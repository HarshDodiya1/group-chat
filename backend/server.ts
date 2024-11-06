import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
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
import { defaultRoute } from "./routes/defaultRoute";
import { authRoute } from "./routes/AuthRoutes";
import { chatRoute } from "./routes/ChatGroupRoutes";

// Example: app.use('/api/users', userRoutes);
app.use("/", defaultRoute);
app.use("/api/auth", authRoute);
app.use("/api", chatRoute);

// Server listener
const port = config.port || 3000;
app.listen(port, () => {
  console.log(`⚙️  Server is running at port: ${port}`);
});
