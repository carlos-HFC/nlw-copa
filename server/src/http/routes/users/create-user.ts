import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import z from "zod";

export async function createUser(app: FastifyInstance) {
  app.post("/users", async (request, reply) => {
    const createUserBody = z.object({
      access_token: z.string()
    });

    const { access_token } = createUserBody.parse(request.body);

    const userResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    console.log(userResponse);
    const userData = await userResponse.json();

    const userInfoSchema = z.object({
      sub: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url()
    });

    const userInfo = userInfoSchema.parse(userData);

    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.sub
      }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.sub,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
        }
      });
    }

    const token = app.jwt.sign({
      name: user.name,
      avatarUrl: user.avatarUrl
    }, {
      sub: user.id,
      expiresIn: "7 days",
    });

    return {
      token
    };
  });
}