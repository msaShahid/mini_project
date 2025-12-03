import express, {Request, Response ,NextFunction } from 'express'
import cors from 'cors';
import path from 'path';
import apiRouter from './routes/index.js';
import { rateLimiter } from './middleware/rateLimiter.middleware.js';
import { loggerMiddleware } from './middleware/logger.middleware.js';
import { logger } from './utils/logger.js';
import client from './cache/client.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(loggerMiddleware);

app.use('/api/v1', rateLimiter, apiRouter);

app.get("/health/redis", async (req, res) => {
  try {
    const pong = await client.ping();
    res.status(200).send(`Redis OK: ${pong}`);
  } catch (err) {
    res.status(500).send("Redis DOWN");
  }
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    logger.error(err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Somthing went wrong.'
    })
})

export default app;
