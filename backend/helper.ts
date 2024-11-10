import { consumer, producer } from "./config/kafka.config";
import db from "./db/db";

export const produceMessage = async (topic: string, message: any) => {
  await producer.send({
    topic,
    messages: [
      {
        value: JSON.stringify(message),
      },
    ],
  });
};

export const consumeMessage = async (topic: string) => {
  await consumer.connect();
  await consumer.subscribe({ topic: topic });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value?.toString()!);
      console.log({
        partition,
        offset: message.offset,
        value: data,
      });
      await db.chats.create({
        data: data,
      });
    },
  });
};
