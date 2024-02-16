import cors from "@fastify/cors";
import fastify from "fastify";

import { env } from "@/env/env";

import { countGuesses } from "./routes/count-guesses";
import { countUsers } from "./routes/count-users";
import { createPool } from "./routes/create-pool";
import { countPools } from "./routes/count-pools";

const app = fastify({
  logger: true
});

app.register(cors, {
  origin: "*"
});

app.register(createPool);
app.register(countUsers);
app.register(countGuesses);
app.register(countPools);

app.listen({
  port: env.PORT,
  host: "0.0.0.0"
}).then(() => console.log('HTTP server running!'));