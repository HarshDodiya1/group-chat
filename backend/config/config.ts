import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  cors_origin1: process.env.CORS_ORIGIN1 || "http://localhost:4000",
  cors_origin2: process.env.CORS_ORIGIN2 || "http://localhost:5000",
  socketIo: process.env.SOCKET_IO || "https://admin.socket.io",
  dbURL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  linkedIn: process.env.LINKEDIN,
  github: process.env.GITHUB,
  redisHost: process.env.REDIS_HOST as string,
  redisPort: process.env.REDIS_PORT!,
  redisPassword: process.env.REDIS_PASSWORD as string,
  kafkaBroker: process.env.KAFKA_BROKER,
  kafkaUsername: process.env.KAFKA_USERNAME,
  kafkaPassword: process.env.KAFKA_PASSWORD,
  kafkaTopic: process.env.KAFKA_TOPIC,
};
