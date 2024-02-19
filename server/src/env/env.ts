import dotenv from 'dotenv';
import z from "zod";

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string()
});

export const env = envSchema.parse(process.env);