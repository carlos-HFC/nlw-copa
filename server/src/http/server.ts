import cors from "@fastify/cors";
import fastify from "fastify";

import { env } from "@/env/env";

import { countGuesses } from "./routes/count-guesses";
import { countUsers } from "./routes/count-users";
import { createPoll } from "./routes/create-poll";
import { countPolls } from "./routes/count-polls";

const app = fastify({
  logger: true
});

app.register(cors, {
  origin: "*"
});

app.register(createPoll);
app.register(countUsers);
app.register(countGuesses);
app.register(countPolls);

app.listen({
  port: env.PORT,
  host: "0.0.0.0"
}).then(() => console.log('HTTP server running!'));