import { api } from "../api";

interface CreateGuessRequest {
  pollId: string;
  gameId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export async function createGuess(request: CreateGuessRequest) {
  return await api.post(`/polls/${request.pollId}/games/${request.gameId}/guesses`, {
    firstTeamPoints: request.firstTeamPoints,
    secondTeamPoints: request.secondTeamPoints
  });
}