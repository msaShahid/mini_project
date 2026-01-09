import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import { logger } from "./utils/logger.js";
import connectDB from "./config/db.js";
import { WebSocketServer, WebSocket } from "ws";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

// -------------
// Global WebSocket server reference
// -------------
export let wss: WebSocketServer;

// -------------
// Broadcast helper
// -------------
export const broadcast = (data: any) => {
  if (!wss) return; 
  const payload = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(payload);
  });
};

async function bootstrap() {
  try {
    logger.info("Starting server...");

    // Connect to DB
    await connectDB();

    // Create HTTP server from Express app
    const server = http.createServer(app);

    // -----------------------------
    // Initialize WebSocket server
    // -----------------------------
    wss = new WebSocketServer({ server });

    wss.on("connection", (ws) => {
      console.log("WebSocket client connected");

      ws.on("close", () => {
        console.log("WebSocket client disconnected");
      });

      ws.on("message", (message) => {
        console.log("Received message from client:", message.toString());
      });
    });

    server.listen(PORT, () => {
      logger.info(`Server listening on http://localhost:${PORT}`);
    });

    // -----------------------------
    // Graceful shutdown
    // -----------------------------
    const shutdown = async (signal: string) => {
      logger.warn(`Shutting down (${signal})`);

      // Close all WS clients
      wss.clients.forEach((client) => client.close());

      server.close(() => {
        logger.info("HTTP server closed");
        process.exit(0);
      });

      setTimeout(() => {
        logger.error("Force shutdown");
        process.exit(1);
      }, 10_000).unref();
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

  } catch (err) {
    logger.error("Startup failed:", err);
    process.exit(1);
  }
}

bootstrap();
