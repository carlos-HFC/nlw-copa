import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider, StatusBar } from 'native-base';

import { Loading } from "@/components/Loading";

import { FindPool } from "@/screens/FindPool";
import { NewPool } from "@/screens/NewPool";
import { Pools } from "@/screens/Pools";
import { Signin } from "@/screens/SignIn";

import { AuthContextProvider } from "@/contexts/AuthContext";

import { THEME } from "@/styles/theme";

export default function App() {
  const [isFontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={"transparent"}
          translucent
        />
        {!isFontsLoaded
          ? <Loading />
          : <Pools />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}