import { kafka } from "./kafkaClient.js";
import { logger } from "../utils/logger.js";
import type { TopicName } from "./topics.js";

const producer = kafka.producer({
  allowAutoTopicCreation: false,
  idempotent: true, 
});

let isReady = false;

export async function initProducer() {
  if (isReady) return;

  await producer.connect();
  isReady = true;

  logger.info("Kafka producer ready");
}

export async function sendMessage<T>(
  topic: TopicName,
  payload: T
) {
  if (!isReady) {
    throw new Error("Kafka producer not initialized");
  }

  await producer.send({
    topic,
    messages: [
      {
        value: JSON.stringify(payload),
      },
    ],
  });
}

export async function shutdownProducer() {
  if (isReady) {
    await producer.disconnect();
    isReady = false;
  }
}
