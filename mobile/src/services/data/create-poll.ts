import { api } from "../api";

export async function createPoll(title: string) {
  return await api.post("/polls", { title });
}