import dotenv from "dotenv";
dotenv.config();

export const kafkaConfig = {
  kafkaBroker: process.env.KAFKA_BROKER!,
  kafkaClientId: process.env.KAFKA_CLIENT_ID || "my-app",
};
