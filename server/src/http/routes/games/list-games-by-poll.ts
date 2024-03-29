import { FastifyInstance } from "fastify";
import z from "zod";

import { prisma } from "@/lib/prisma";
import { authenticate } from "@/plugins/authenticate";

export async function listGamesByPoll(app: FastifyInstance) {
  app.get(
    "/polls/:id/games",
    { onRequest: [authenticate] },
    async (request, reply) => {
      const getPollParams = z.object({
        id: z.string()
      });

      const { id } = getPollParams.parse(request.params);

      const games = await prisma.game.findMany({
        orderBy: {
          date: "desc"
        },
        include: {
          guesses: {
            where: {
              participant: {
                userId: request.user.sub,
                pollId: id
              }
            }
          }
        }
      });

      return {
        games: games.map(game => ({
          ...game,
          guess: game.guesses.length > 0 ? game.guesses[0] : null,
          guesses: undefined
        }))
      };
    }
  );
}