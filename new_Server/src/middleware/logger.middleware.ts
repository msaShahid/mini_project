import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

    const shouldLogBody = ["POST", "PUT", "PATCH", "DELETE"].includes(req.method);

  logger.info({
    type: "request",
    method: req.method,
    url: req.originalUrl,
    client: {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    },
    user: { id: req.user?.id || null },
    query: req.query,
    body: shouldLogBody ? req.body : null,
    files: req.files || null,
    headers: {
      "content-type": req.headers["content-type"],
    },
    duration: null,
  });

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info("Response sent", {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      user: req.user?.id,
    });
  });

  next();
};
