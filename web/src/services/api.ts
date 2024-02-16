import { env } from "@/env/env";

async function get(url: string, init?: RequestInit) {
  return await fetch(`${env.NEXT_API_URL}${url}`, init);
}

async function post(url: string, data: object) {
  return await fetch(`${env.NEXT_API_URL}${url}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

export const api = {
  get,
  post
};