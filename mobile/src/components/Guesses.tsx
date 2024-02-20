import { FlatList, useToast } from 'native-base';
import { useEffect, useState } from "react";

import { Game } from "./Game";

import { createGuess } from "@/services/data/create-guess";
import { getGames } from "@/services/data/get-games";

interface GuessesProps {
  pollId: string;
}

const INITIAL_STATE = {
  firstTeamPoints: "",
  secondTeamPoints: "",
};

export function Guesses({ pollId }: GuessesProps) {
  const [, setIsLoading] = useState(true);
  const [games, setGames] = useState<Game[]>([]);
  const [points, setPoints] = useState(INITIAL_STATE);

  const toast = useToast();

  useEffect(() => {
    fetchGames();
  }, []);

  async function fetchGames() {
    try {
      setIsLoading(true);

      const response = await getGames(pollId);

      setGames(response.data.games);
    } catch (error) {
      toast.show({
        title: "Não foi possível carregar os jogos",
        placement: "top",
        bgColor: "red.500"
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGuessConfirm(gameId: string) {
    if (Object.values(points).some(item => !item.trim())) {
      return toast.show({
        title: "Informe o placar do palpite",
        placement: "top",
        bgColor: "red.500"
      });
    }

    try {
      setIsLoading(true);

      await createGuess({
        pollId,
        gameId,
        firstTeamPoints: Number(points.firstTeamPoints),
        secondTeamPoints: Number(points.secondTeamPoints),
      });

      toast.show({
        title: "Palpite enviado com sucesso!",
        placement: "top",
        bgColor: "green.500"
      });

      fetchGames();
    } catch (error) {
      toast.show({
        title: "Não foi possível enviar o palpite",
        placement: "top",
        bgColor: "red.500"
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={firstTeamPoints => setPoints(prev => ({ ...prev, firstTeamPoints }))}
          setSecondTeamPoints={secondTeamPoints => setPoints(prev => ({ ...prev, secondTeamPoints }))}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      showsVerticalScrollIndicator={false}
      _contentContainerStyle={{ pb: 97 }}
    />
  );
}
