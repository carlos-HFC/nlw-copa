import { Fontisto } from '@expo/vector-icons';
import { Center, Icon, Text } from "native-base";

import { Button } from "@/components/Button";

import { useAuth } from "@/contexts/AuthContext";

import Logo from '@/assets/logo.svg';

export function Signin() {
  const { signIn } = useAuth();

  return (
    <Center
      flex={1}
      bgColor="gray.900"
      p={7}
    >
      <Logo
        width={212}
        height={40}
      />

      <Button
        title="ENTRAR COM O GOOGLE"
        type="secondary"
        leftIcon={<Icon as={Fontisto} name={"google"} color={"white"} size={"md"} />}
        mt={12}
        onPress={signIn}
      />

      <Text
        color={"white"}
        textAlign={"center"}
        mt={4}
      >
        Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  );
}