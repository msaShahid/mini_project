import { TOPICS } from "./topics.js";
import { startConsumer } from "./consumer.js";
import { initProducer, shutdownProducer } from "./producer.js";
import { logger } from "../utils/logger.js";

const consumers: any[] = [];

export async function initKafka() {
  logger.info("Initializing Kafka");

  await initProducer();

  consumers.push(
    await startConsumer(
      "post-service",
      TOPICS.POST_CREATED,
      async (payload) => {
        logger.info("POST_CREATED event:", payload);
      }
    )
  );

  logger.info("Kafka initialized");
}

export async function shutdownKafka() {
  logger.info("Shutting down Kafka");

  for (const consumer of consumers) {
    await consumer.disconnect();
  }

  await shutdownProducer();

  logger.info("Kafka shutdown complete");
}
