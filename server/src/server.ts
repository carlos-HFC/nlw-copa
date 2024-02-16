import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

const prisma = new PrismaClient({
  log: ['query']
});

async function bootstrap() {
  const app = fastify({
    logger: true
  });

  await app.register(cors, {
    origin: "*"
  });

  await app.listen({
    port: 3333,
    host: "0.0.0.0"
  });
}

bootstrap();