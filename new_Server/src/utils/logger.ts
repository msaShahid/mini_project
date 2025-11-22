import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize, json } = format;

const consoleFormat = printf(({ level, message, timestamp, meta }) => {
  return `[${timestamp}] [${level}] ${message} ${meta ? JSON.stringify(meta) : ""}`;
});

export const logger = createLogger({
  level: "info", 
  format: combine(timestamp(), json()), 
  transports: [
   
    new transports.Console({
      format: combine(colorize(), timestamp(), consoleFormat),
    }),
    
    new transports.File({ filename: "logs/app.log", level: "info" }),
    new transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});
