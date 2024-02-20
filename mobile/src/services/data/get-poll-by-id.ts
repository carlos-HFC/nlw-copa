import { api } from "../api";

export async function getPollById(id: string) {
  return await api.get(`/polls/${id}`);
}