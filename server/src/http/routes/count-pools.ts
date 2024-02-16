import { FastifyInstance } from "fastify";

import { prisma } from "@/lib/prisma";

export async function countPools(app: FastifyInstance) {
  app.get('/pools/count', async (request, reply) => {
    const count = await prisma.pool.count();

    return { count };
  });
}