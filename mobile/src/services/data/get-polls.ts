import { api } from "../api";

export async function getPolls() {
  return await api.get("/polls");
}