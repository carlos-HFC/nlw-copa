import { FastifyInstance } from "fastify";

import { prisma } from "@/lib/prisma";

export async function countUsers(app: FastifyInstance) {
  app.get('/users/count', async (request, reply) => {
    const count = await prisma.user.count();

    return { count };
  });
}