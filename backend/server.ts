import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { config } from "./config/config";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socket";

const app: Application = express();
dotenv.config();

// socket.io
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [config.cors_origin1, config.cors_origin2],
  },
});

setupSocket(io);
export { io };

// CORS Configuration
// app.use(
//   cors({
//     origin: [config.cors_origin1, config.cors_origin2],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
//   cors({
//     origin: "*",
//   }),
// );

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
server.listen(port, () => {
  console.log(`⚙️  Server is running at port: ${port}`);
});
