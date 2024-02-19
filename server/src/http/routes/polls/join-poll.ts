import { FastifyInstance } from "fastify";
import z from "zod";

import { prisma } from "@/lib/prisma";
import { authenticate } from "@/plugins/authenticate";

export async function joinPoll(app: FastifyInstance) {
  app.post(
    "/polls/join",
    { onRequest: [authenticate] },
    async (request, reply) => {
      const joinPollBody = z.object({
        code: z.string().length(6)
      });

      const { code } = joinPollBody.parse(request.body);

      const poll = await prisma.poll.findUnique({
        where: {
          code
        },
        include: {
          participants: {
            where: {
              userId: request.user.sub
            }
          }
        }
      });

      if (!poll) {
        return reply.status(404).send({
          message: "Poll not found."
        });
      }

      if (poll.participants.length > 0) {
        return reply.status(400).send({
          message: "You already joined this poll."
        });
      }

      if (!poll.ownerId) {
        await prisma.poll.update({
          where: {
            id: poll.id
          },
          data: {
            ownerId: request.user.sub
          }
        });
      }

      await prisma.participant.create({
        data: {
          pollId: poll.id,
          userId: request.user.sub
        }
      });

      return reply.status(201).send();
    }
  );
}