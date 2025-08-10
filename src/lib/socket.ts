// lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  if (typeof window === "undefined") return null as unknown as Socket;
  console.log('socket is initilizing')
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BASE_URL || "", {
      transports: ["websocket"],
    });
  }

  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initSocket() first.");
  }
  return socket;
};
