import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors"; // Import cors
import { createServer } from "http";
import { Server } from "socket.io";
import { config } from "./config/config";
import { setupSocket } from "./socket";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redis.config";
import { instrument } from "@socket.io/admin-ui";

dotenv.config();
const app: Application = express();

// CORS Configuration
app.use(
  cors({
    origin: [config.cors_origin1, config.cors_origin2], // Ensure frontend origin is allowed
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// socket.io
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [config.cors_origin1, config.cors_origin2, config.socketIo],
    credentials: true,
  },
  adapter: createAdapter(redis),
});

// Uncomment if using Socket.io Admin UI
instrument(io, {
  auth: false,
});

export { io };
setupSocket(io);

// Body parsers
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

// Static folder
app.use(express.static("public"));

// Cookie parser
app.use(cookieParser());

// Imported Routes
import { authRoute } from "./routes/AuthRoutes";
import { chatRoute } from "./routes/ChatGroupRoutes";
import { defaultRoute } from "./routes/defaultRoute";
import { chatGroupUserRoutes } from "./routes/ChatGroupUserRoutes";
import { ChatsRoutes } from "./routes/ChatsRoutes";
import { connectKafkaProducer } from "./config/kafka.config";
import { consumeMessage } from "./helper";

app.use("/", defaultRoute);
app.use("/api/auth", authRoute);
app.use("/api", chatRoute);
app.use("/api", chatGroupUserRoutes);
app.use("/api", ChatsRoutes);

// Server listener

connectKafkaProducer().catch((err) => {
  console.error("Error connecting to Kafka producer:", err);
});

consumeMessage(config.kafkaTopic!).catch((err) => {
  console.error("Error consuming Kafka message:", err);
});

const port = config.port || 3000;
server.listen(port, () => {
  console.log(`⚙️  Server is running at port: ${port}`);
});
