import { FastifyInstance } from "fastify";
import z from "zod";

import { prisma } from "@/lib/prisma";
import ShortUniqueId from "short-unique-id";

export async function createPool(app: FastifyInstance) {
  app.post('/pools', async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    });

    const { title } = createPoolBody.parse(request.body);

    const generate = new ShortUniqueId({ length: 6 });
    const code = generate.rnd().toUpperCase();

    await prisma.pool.create({
      data: {
        title,
        code
      }
    });

    return reply.status(201).send({ code });
  });
}