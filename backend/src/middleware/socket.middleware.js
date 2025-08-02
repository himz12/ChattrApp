// socket.middleware.js
import { Server } from "socket.io";

let onlineUsers = [];

export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5173",
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId && !onlineUsers.includes(String(userId))) {
      onlineUsers.push(String(userId));
    }

    io.emit("onlineUsers", onlineUsers);

    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter(id => id !== String(userId));
      io.emit("onlineUsers", onlineUsers);
    });
  });

  console.log("Socket.io is set up!");
};