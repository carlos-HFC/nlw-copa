import { useNavigation } from "@react-navigation/native";
import { Heading, VStack, useToast } from "native-base";
import { useState } from "react";

import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";

import { joinPoll } from "@/services/data/join-poll";

export function FindPoll() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const navigation = useNavigation();

  const toast = useToast();

  async function handleJoinPoll() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: "Informe o código do bolão",
          placement: "top",
          bgColor: "red.500"
        });
      }

      await joinPoll(code);

      navigation.navigate("polls");
    } catch (error) {
      toast.show({
        title: error?.response?.data?.message ?? "Não foi possível encontrar o bolão",
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
      <Header
        title="Buscar por código"
        showBackButton
      />

      <VStack
        mt={8}
        mx={5}
        alignItems={"center"}
      >
        <Heading
          fontFamily={'heading'}
          color={"white"}
          fontSize={"xl"}
          mb={8}
          textAlign={"center"}
        >
          Encontrar um bolão através de {"\n"} seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          value={code}
          onChangeText={setCode}
        />

        <Button
          title="Buscar bolão"
          onPress={handleJoinPoll}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
}