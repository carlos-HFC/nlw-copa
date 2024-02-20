import { Fontisto } from '@expo/vector-icons';
import { getName } from 'country-list';
import { format, setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button, HStack, Text, useTheme, VStack } from 'native-base';

import { Team } from './Team';

interface GameProps {
  data: Game;
  onGuessConfirm: () => void;
  setFirstTeamPoints: (value: string) => void;
  setSecondTeamPoints: (value: string) => void;
};

setDefaultOptions({
  locale: ptBR
});

export function Game({ data, setFirstTeamPoints, setSecondTeamPoints, onGuessConfirm }: GameProps) {
  const { colors, sizes } = useTheme();

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {getName(data.firstTeamCountryCode)} vs. {getName(data.secondTeamCountryCode)}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {format(data.date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm")}
      </Text>

      <HStack mt={4} w="full" justifyContent="space-between" alignItems="center">
        <Team
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamPoints}
        />

        <Fontisto
          name="close"
          color={colors.gray[300]}
          size={sizes[6]}
        />

        <Team
          code={data.secondTeamCountryCode}
          position="left"
          onChangeText={setSecondTeamPoints}
        />
      </HStack>

      {!data.guess && (
        <Button size="xs" w="full" bgColor="green.500" mt={4} onPress={onGuessConfirm}>
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              CONFIRMAR PALPITE
            </Text>

            <Fontisto
              name="check"
              color={colors.white}
              size={sizes[4]}
            />
          </HStack>
        </Button>
      )}
    </VStack>
  );
}