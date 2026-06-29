import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../prisma/generated/client";

export const file = process.env.DATABASE_URL
  ? `file:./${process.env.DATABASE_URL}`
  : "";
  
const adapter = new PrismaBetterSqlite3({
  url: file,
});

export const prisma = new PrismaClient({ adapter });
