import { FastifyInstance } from "fastify";

import { prisma } from "@/lib/prisma";
import { authenticate } from "@/plugins/authenticate";

export async function getPollsParticipating(app: FastifyInstance) {
  app.get(
    "/polls",
    { onRequest: [authenticate] },
    async (request, reply) => {
      const polls = await prisma.poll.findMany({
        where: {
          participants: {
            some: {
              userId: request.user.sub
            }
          }
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

      return { polls };
    }
  );
}