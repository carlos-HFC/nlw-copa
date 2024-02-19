import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@email.com",
      avatarUrl: "https://github.com/carlos-hfc.png"
    }
  });

  const poll = await prisma.poll.create({
    data: {
      title: "Example poll",
      code: "BOL123",
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id
        }
      }
    }
  });

  await Promise.all([
    prisma.game.create({
      data: {
        date: "2024-03-01T15:00:00.000Z",
        firstTeamCountryCode: "BR",
        secondTeamCountryCode: "EC"
      }
    }),
    prisma.game.create({
      data: {
        date: "2024-03-02T15:00:00.000Z",
        firstTeamCountryCode: "AR",
        secondTeamCountryCode: "UY",
        guesses: {
          create: {
            firstTeamPoints: 0,
            secondTeamPoints: 2,
            participant: {
              connect: {
                userId_pollId: {
                  userId: user.id,
                  pollId: poll.id,
                }
              }
            }
          }
        }
      }
    }),
  ]);
}

main();