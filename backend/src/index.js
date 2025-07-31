import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import http from 'http';
import authRoutes from '../../routes/auth.routes.js';       // ✅ CORRECT
import messageRoutes from '../../routes/message.routes.js'; // ✅ CORRECT
import { setupSocket } from '../../middleware/socket.middleware.js'; // ✅ CORRECT
import { connectDB } from '../../lib/db.js';

dotenv.config();
const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "./frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res, next) => {
    if (req.originalUrl.startsWith("/api/")) return next();
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// ✅ Setup socket.io using your socket.middleware.js
setupSocket(server);

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  connectDB();
});
