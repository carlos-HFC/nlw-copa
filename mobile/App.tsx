import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider, StatusBar } from 'native-base';

import { Loading } from "@/components/Loading";
import { Signin } from "@/screens/Signin";

import { THEME } from "@/styles/theme";

export default function App() {
  const [isFontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={"transparent"}
        translucent
      />

      {!isFontsLoaded
        ? <Loading />
        : <Signin />}
    </NativeBaseProvider>
  );
}