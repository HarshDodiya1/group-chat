import { Server } from "socket.io";

export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("The socket is connected", socket.id);

    socket.on("message", (data) => {
      console.log("server side message is : ", data);
      socket.broadcast.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
}
