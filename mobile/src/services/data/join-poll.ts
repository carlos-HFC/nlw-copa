import { api } from "../api";

export async function joinPoll(code: string) {
  return await api.post('/polls/join', { code });
}