import { Kafka, logLevel } from "kafkajs";
import {kafkaConfig} from '../config/kafka.js'


const broker = kafkaConfig.kafkaBroker;
if (!broker) {
  throw new Error("KAFKA_BROKER is not defined");
}

export const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || "my-app",
  brokers: [broker],
  logLevel: logLevel.NOTHING, 
  retry: {
    retries: 8,
  },
});
