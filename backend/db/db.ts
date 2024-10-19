import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  log: ["query", "error"],
}).then(() => {
  console.log("Connected to the database");
});
export default db;
