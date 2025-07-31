import { Server } from "socket.io";
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true }
});

let onlineUsers = [];

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId && !onlineUsers.includes(userId)) {
    onlineUsers.push(userId);
  }

  // Send updated list to all clients
  io.emit("onlineUsers", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter(id => id !== userId);
    io.emit("onlineUsers", onlineUsers);
  });
});
