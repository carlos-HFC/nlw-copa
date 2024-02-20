import { Octicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FlatList, Icon, VStack, useToast } from "native-base";
import { useCallback, useState } from "react";

import { Button } from "@/components/Button";
import { EmptyPollList } from "@/components/EmptyPollList";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { PollCard } from "@/components/PollCard";

import { getPolls } from "@/services/data/get-polls";

export function Polls() {
  const navigation = useNavigation();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [polls, setPolls] = useState<Poll[]>([]);

  useFocusEffect(useCallback(() => {
    fetchPolls();
  }, []));

  async function fetchPolls() {
    try {
      setIsLoading(true);

      const response = await getPolls();

      setPolls(response.data.polls);
    } catch (error) {
      toast.show({
        title: "Não foi possível carregar os bolões",
        placement: "top",
        bgColor: "red.500"
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack
      flex={1}
      bgColor={"gray.900"}
    >
      <Header title="Meus bolões" />

      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor={"gray.600"}
        pb={4}
        mb={4}
      >
        <Button
          title="Buscar bolão por código"
          leftIcon={<Icon as={Octicons} name={"search"} color={"black"} size={"md"} />}
          onPress={() => navigation.navigate("find")}
        />
      </VStack>

      {isLoading
        ? <Loading />
        : <FlatList
          data={polls}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PollCard
              data={item}
              onPress={() => navigation.navigate("details", { id: item.id })}
            />
          )}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 97 }}
          ListEmptyComponent={EmptyPollList}
        />
      }
    </VStack>
  );
}