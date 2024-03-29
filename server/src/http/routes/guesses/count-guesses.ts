import { FastifyInstance } from "fastify";

import { prisma } from "@/lib/prisma";

export async function countGuesses(app: FastifyInstance) {
  app.get('/guesses/count', async (request, reply) => {
    const count = await prisma.guess.count();

    return { count };
  });
}