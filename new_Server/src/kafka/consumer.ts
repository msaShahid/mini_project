import { kafka } from "./kafkaClient.js";
import { logger } from "../utils/logger.js";
import type { TopicName } from "./topics.js";

type MessageHandler<T> = (payload: T) => Promise<void>;

export async function startConsumer<T>(
  groupId: string,
  topic: TopicName,
  handler: MessageHandler<T>
) {
  const consumer = kafka.consumer({
    groupId,
    allowAutoTopicCreation: false,
  });

  await consumer.connect();
  await consumer.subscribe({ topic });

  await consumer.run({
    autoCommit: true,
    eachMessage: async ({ message }) => {
      if (!message.value) return;

      try {
        const payload = JSON.parse(message.value.toString());
        await handler(payload);
      } catch (err) {
        logger.error("Kafka message failed:", err);
      }
    },
  });

  logger.info(`Consumer started (${groupId} → ${topic})`);

  return consumer;
}
