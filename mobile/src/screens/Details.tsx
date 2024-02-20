import { useRoute } from "@react-navigation/native";
import { HStack, VStack, useToast } from "native-base";
import { useEffect, useState } from "react";
import { Share } from "react-native";

import { EmptyMyPollList } from "@/components/EmptyMyPollList";
import { Guesses } from "@/components/Guesses";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { Option } from "@/components/Option";
import { PollHeader } from "@/components/PollHeader";

import { getPollById } from "@/services/data/get-poll-by-id";

interface RouteParams {
  id: string;
}

enum Options {
  MY_GUESSES = 'MY_GUESSES',
  RANKING = 'RANKING'
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [optionSelected, setOptionSelected] = useState<Options>(Options.MY_GUESSES);
  const [poll, setPoll] = useState({} as Poll);

  const toast = useToast();

  const route = useRoute();

  const { id } = route.params as RouteParams;

  useEffect(() => {
    getPollDetails();
  }, [id]);

  async function getPollDetails() {
    try {
      setIsLoading(true);

      const response = await getPollById(id);

      setPoll(response.data.poll);
    } catch (error) {
      toast.show({
        title: "Não foi possível carregar os detalhes do bolão",
        placement: "top",
        bgColor: "red.500"
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleShareCode() {
    await Share.share({
      message: poll.code
    });
  }

  if (isLoading) return <Loading />;

  return (
    <VStack flex={1} bgColor={"gray.900"}>
      <Header
        title={poll.title}
        showBackButton
        showShareButton
        onShare={handleShareCode}
      />

      {poll._count.participants > 0
        ? (
          <VStack flex={1} px={5}>
            <PollHeader data={poll} />

            <HStack
              bgColor={"gray.800"}
              p={1}
              rounded={"sm"}
              mb={5}
            >
              <Option
                title="Seus palpites"
                isSelected={optionSelected === Options.MY_GUESSES}
                onPress={() => setOptionSelected(Options.MY_GUESSES)}
              />
              <Option
                title="Ranking do grupo"
                isSelected={optionSelected === Options.RANKING}
                onPress={() => setOptionSelected(Options.RANKING)}
              />
            </HStack>

            <Guesses pollId={id} />
          </VStack>
        ) : <EmptyMyPollList code={poll.code} />}
    </VStack>
  );
}