import { FastifyInstance } from "fastify";
import ShortUniqueId from "short-unique-id";
import z from "zod";

import { prisma } from "@/lib/prisma";

export async function createPoll(app: FastifyInstance) {
  app.post('/polls', async (request, reply) => {
    const createPollBody = z.object({
      title: z.string(),
    });

    const { title } = createPollBody.parse(request.body);

    const generate = new ShortUniqueId({ length: 6 });
    const code = generate.rnd().toUpperCase();

    let ownerId: string | null = null;

    try {
      await request.jwtVerify();

      ownerId = request.user.sub;
    } catch (error) {
      ownerId = null;
    }

    await prisma.poll.create({
      data: {
        title,
        code,
        ownerId,
        ...(ownerId && {
          participants: {
            create: {
              userId: ownerId
            }
          }
        })
      }
    });

    return reply.status(201).send({ code });
  });
}