import { FastifyInstance } from "fastify";

import { prisma } from "@/lib/prisma";

export async function countPolls(app: FastifyInstance) {
  app.get('/polls/count', async (request, reply) => {
    const count = await prisma.poll.count();

    return { count };
  });
}