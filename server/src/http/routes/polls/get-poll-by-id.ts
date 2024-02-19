import { FastifyInstance } from "fastify";
import z from "zod";

import { prisma } from "@/lib/prisma";
import { authenticate } from "@/plugins/authenticate";

export async function getPollById(app: FastifyInstance) {
  app.get(
    "/polls/:id",
    { onRequest: [authenticate] },
    async (request, reply) => {
      const getPollParams = z.object({
        id: z.string()
      });

      const { id } = getPollParams.parse(request.params);

      const poll = await prisma.poll.findUnique({
        where: {
          id
        },
        include: {
          _count: {
            select: {
              participants: true
            }
          },
          owner: {
            select: {
              name: true,
              id: true
            }
          },
          participants: {
            select: {
              id: true,
              user: {
                select: {
                  avatarUrl: true
                }
              }
            },
            take: 4
          }
        }
      });

      if (!poll) {
        return reply.status(404).send({
          message: "Poll not found."
        });
      }

      return { poll };
    }
  );
}