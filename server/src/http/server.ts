import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import fastify from "fastify";

import { env } from "@/env/env";

import { listGamesByPoll } from "./routes/games/list-games-by-poll";
import { countGuesses } from "./routes/guesses/count-guesses";
import { createGuess } from "./routes/guesses/create-guess";
import { countPolls } from "./routes/polls/count-polls";
import { createPoll } from "./routes/polls/create-poll";
import { getPollById } from "./routes/polls/get-poll-by-id";
import { getPollsParticipating } from "./routes/polls/get-polls-participate";
import { joinPoll } from "./routes/polls/join-poll";
import { countUsers } from "./routes/users/count-users";
import { createUser } from "./routes/users/create-user";
import { getLoggedUser } from "./routes/users/get-logged-user";

const app = fastify({
  logger: true
});

app.register(cors, {
  origin: "*"
});

app.register(jwt, {
  secret: env.JWT_SECRET
});

app.register(listGamesByPoll);

app.register(countGuesses);
app.register(createGuess);

app.register(countPolls);
app.register(createPoll);
app.register(getPollById);
app.register(getPollsParticipating);
app.register(joinPoll);

app.register(countUsers);
app.register(createUser);
app.register(getLoggedUser);

app.listen({
  port: env.PORT,
  host: "0.0.0.0"
}).then(() => console.log('HTTP server running!'));