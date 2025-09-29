import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

import { envServer } from "../config/server.env";

const { combine, timestamp, errors, json } = format;
const { LOG_LEVEL, LOGTAIL_SOURCE_TOKEN, NODE_ENV, LOGTAIL_INGESTING_HOST } = envServer;

type LogLevel = "error" | "warn" | "info" | "http" | "verbose" | "debug" | "silly";

type GenerateDailyRotation = {
  filename: string;
  level: LogLevel;
  duration: `${number}d`;
};

const generateDailyRotation = ({ filename, level, duration }: GenerateDailyRotation) =>
  new DailyRotateFile({
    level: level,
    filename: `logs/${filename}-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "10m",
    maxFiles: duration,
  });

const allLogsRotation = generateDailyRotation({ filename: "combined", level: "info", duration: "14d" });
const errorLogsRotation = generateDailyRotation({ filename: "error", level: "error", duration: "30d" });
const exceptionLogsRotation = generateDailyRotation({ filename: "exceptions", level: "error", duration: "30d" });
const rejectionLogsRotation = generateDailyRotation({ filename: "rejections", level: "error", duration: "30d" });

const formatErrors = format((info) => {
  if (info.error instanceof Error) return { ...info, error: { message: info.error.message, stack: info.error.stack } };
  return info;
});

export const logger = createLogger({
  level: LOG_LEVEL,
  format: combine(
    // colorize({ all: true }),
    formatErrors(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ trace: true }),
    json()
  ),
  transports: [allLogsRotation, errorLogsRotation],
  /**
   * Hono routes run inside async context so this probably won't be used since Winston catches
   * uncaught exceptions that bubble all the way up to Node.js event loop
   */
  exceptionHandlers: [exceptionLogsRotation],
  rejectionHandlers: [rejectionLogsRotation],
});

if (LOGTAIL_SOURCE_TOKEN && LOGTAIL_INGESTING_HOST) {
  const logtail = new Logtail(LOGTAIL_SOURCE_TOKEN, {
    endpoint: `https://${LOGTAIL_INGESTING_HOST}`,
  });

  logger.add(new LogtailTransport(logtail));

  // TODO: This is not working
  const gracefulShutdown = async () => {
    console.log("Received shutdown signal, flushing logs...");
    try {
      await logtail.flush();
      console.log("Logs flushed successfully. Exiting...");
      process.exit(0);
    } catch (error) {
      console.error("Error flushing logs:", error);
      process.exit(1);
    }
  };

  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);
}

if (NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: json(),
    })
  );
}

/**
 * Define Objectives Upfront
 * Begin by identifying the core business goals, critical operations, and KPIs that your logs need to support.
 * Clear objectives help determine what needs to be logged and at what level of detail.
 *
 * Start Broad, Refine Later
 * It’s better to start with more detailed logging and scale back once patterns emerge.
 * Regularly review logs to identify noise, gaps, and missing context.
 *
 * Log Levels and Structure
 * Use appropriate log levels (debug, info, warn, error, etc.) and consistent, structured formats (e.g., JSON)
 * to ensure logs are easy to parse and search—now and in the future.
 *
 * Sampling for Volume Control
 * To prevent excessive storage usage, implement sampling strategies.
 * For example, log only 20% of login attempts if they're frequent, while still capturing enough data for analysis.
 *
 * Distributed Tracing and Canonical Logs
 * Adopt canonical log entries that align with distributed tracing standards (like OpenTelemetry).
 * This allows you to follow a request’s journey across services, improving visibility in complex systems.
 *
 * Retention Policies
 * Set clear retention policies based on log type and business needs.
 * Archive or delete logs periodically to control costs and maintain compliance.
 *
 * Security and Privacy
 * Encrypt logs during transmission and at rest, and implement strict access controls.
 * Avoid logging sensitive data such as API keys, raw queries, or payment details—use identifiers (e.g., user ID, transaction ID) instead.
 *
 * Performance Awareness
 * Logging can introduce latency under high traffic.
 * Ensure your logging strategy (e.g., asynchronous writes, log batching) doesn’t bottleneck critical parts of your application.
 */
