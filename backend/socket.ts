import { Server, Socket } from "socket.io";
import db from "./db/db";
import { produceMessage } from "./helper";

interface CustomSocket extends Socket {
  room?: string;
}

export function setupSocket(io: Server) {
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    if (!room) {
      return next(new Error("Invalid room"));
    }
    socket.room = room;
    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    socket.join(socket.room!);

    console.log("The socket is connected", socket.id);

    socket.on("message", async (data) => {
      // try {
      //   await produceMessage("chats", data);
      // } catch (error) {
      //   console.error("The Kafka producer error is : ", error);
      // }
      // socket.broadcast.emit("message", data);
      await db.chats.create({
        data: data,
      })
      socket.to(socket.room!).emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
}

// at parseError (D:\GitHub Projects\Group-Chat\backend\node_modules\redis-parser\lib\parser.js:179:12)
// at parseType (D:\GitHub Projects\Group-Chat\backend\node_modules\redis-parser\lib\parser.js:302:14)
// [ioredis] Unhandled error event: ReplyError: NOAUTH Authentication required.
