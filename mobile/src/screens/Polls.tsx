import { Octicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { FlatList, Icon, VStack, useToast } from "native-base";
import { useEffect, useState } from "react";

import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { PollCard } from "@/components/PollCard";

import { useAuth } from "@/contexts/AuthContext";
import { getPolls } from "@/services/data/get-polls";

export function Polls() {
  const navigation = useNavigation();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    fetchPolls();
  }, []);

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

      <FlatList
        data={polls}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <PollCard data={item} />}
      />
    </VStack>
  );
}