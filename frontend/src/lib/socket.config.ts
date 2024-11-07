import { config } from "@/config/config";
import { io, Socket } from "socket.io-client";

let socket: Socket;
export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(config.backendUrl, { autoConnect: false });
  }
  return socket;
};
