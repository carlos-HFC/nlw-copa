import { FastifyInstance } from "fastify";

import { authenticate } from "@/plugins/authenticate";

export async function getLoggedUser(app: FastifyInstance) {
  app.get(
    "/me",
    {
      onRequest: [authenticate]
    },
    async (request, reply) => {
      return { user: request.user };
    });
}