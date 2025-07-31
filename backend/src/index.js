import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import authRoutes from "../routes/auth.routes.js";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from '../lib/db.js';
import cors from 'cors';
import path from 'path';
import messageRoutes from '../routes/message.routes.js';

dotenv.config();
const app = express();
const __dirname = path.resolve();
const server = http.createServer(app);  // ✅ Use HTTP server

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

// Socket connection handling
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  })
}
server.listen(port, () => {
  console.log("Server is running on port", port);
  connectDB();
});
