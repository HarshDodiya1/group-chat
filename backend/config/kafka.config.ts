import { Kafka, logLevel } from "kafkajs";
import { config } from "./config";

export const kafka = new Kafka({
  brokers: [config.kafkaBroker!],
  ssl: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
  sasl: {
    mechanism: "scram-sha-256",
    username: config.kafkaUsername!,
    password: config.kafkaPassword!,
  },
  logLevel: logLevel.ERROR,
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "chats" });

export const connectKafkaProducer = async () => {
  await producer.connect();
  console.log("Kafka producer connected");
};
