import { api } from "@/services/api";

type GetDataCountRequest = RequestInit;

interface GetDataCountResponse {
  data: {
    pools: number;
    users: number;
    guesses: number;
  };
}

export async function getDataCount(params?: GetDataCountRequest): Promise<GetDataCountResponse> {
  const [poolsResponse, usersResponse, guessesResponse] = await Promise.all([
    api.get(`/pools/count`, params),
    api.get(`/users/count`, params),
    api.get(`/guesses/count`, params),
  ]);

  const [poolsData, usersData, guessesData] = await Promise.all([
    poolsResponse.json(),
    usersResponse.json(),
    guessesResponse.json()
  ]);

  return {
    data: {
      pools: poolsData.count,
      users: usersData.count,
      guesses: guessesData.count
    }
  };
}