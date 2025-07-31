import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import app from './app.js'; // ✅ Import express app
import { connectDB } from './lib/db.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // ✅ change to frontend URL in production
    credentials: true
  }
});

// Online users tracking
let onlineUsers = [];

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId && !onlineUsers.includes(userId)) {
    onlineUsers.push(userId);
  }

  io.emit("onlineUsers", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter(id => id !== userId);
    io.emit("onlineUsers", onlineUsers);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  connectDB();
});
