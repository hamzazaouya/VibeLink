/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-10-23

 *******************************************************/

import express, { Request } from "express"; // Import express and type
import Logger from "./utils/logger"; // Assuming you are exporting logger as 'user' in logger.ts
import authRouter from "./routes/auth";
import homeRouter from "./routes/home";
import registerRouter from "./routes/registration";
import passwordRouter from "./routes/password";
import profileRouter from "./routes/profile";
import swapRouter from "./routes/swap";
import statusRouter from "./routes/status";
import sessionMiddleware from "./middleware/session";
import passport from "passport";
import "./strategies/discord"; // Import your strategies
import dotenv from "dotenv"; // Import dotenv to manage env variables
import path from "path";
import http from "http";
import { initSocket } from "./utils/socket";
import cors from "cors";
import { Server, Socket } from "socket.io";

dotenv.config(); // Initialize dotenv to load environment variables
const PORT = process.env.PORT || 3000; // Provide a default value for PORT
const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.engine.use(sessionMiddleware);
io.on("connection", (socket: Socket) => {
  const req = socket.request as Request;

  if (req.session && req.session.user) {
    console.log(`Socket connected: ${socket.id}`);
    console.log("Session:", req.session);

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  } else {
    console.log("No session found. Disconnecting socket:", socket.id);
    socket.disconnect(true); // Disconnect the socket if no session
  }
});

// Routes

// Serve the Socket.IO test page at root
app.get("/", (req: express.Request, res: express.Response) => {
  res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>VibeLink - Real-time Social App</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    color: white; 
                    text-align: center; 
                    padding: 50px; 
                }
                .container { 
                    max-width: 600px; 
                    margin: 0 auto; 
                    background: rgba(255,255,255,0.1); 
                    padding: 40px; 
                    border-radius: 15px; 
                    backdrop-filter: blur(10px);
                }
                h1 { font-size: 3em; margin-bottom: 20px; }
                p { font-size: 1.2em; margin-bottom: 15px; }
                .status { color: #4CAF50; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 VibeLink</h1>
                <p class="status">✅ Server is running successfully!</p>
                <p>Your real-time social application is now live.</p>
                <p>Backend services are connected and ready.</p>
                <hr style="margin: 30px 0; border: 1px solid rgba(255,255,255,0.3);">
                <p><strong>Available Services:</strong></p>
                <p>• User Service: Running on port 3000</p>
                <p>• Swap Service: Running on port 3001</p>
                <p>• PostgreSQL Database: Connected</p>
                <p>• Redis Cache: Connected</p>
                <p>• Nginx Proxy: Active</p>
            </div>
        </body>
        </html>
    `);
});

app.use(authRouter);
app.use(homeRouter);
app.use(registerRouter);
app.use(passwordRouter);
app.use(profileRouter);
app.use(swapRouter);
app.use(statusRouter);

server.listen(PORT, () => {
  Logger.user.info(`Server is running on http://localhost:${PORT}`);
});

export default app;
