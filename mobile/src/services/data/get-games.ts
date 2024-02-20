import { api } from "../api";

export async function getGames(pollId: string) {
  return await api.get(`/polls/${pollId}/games`);
}