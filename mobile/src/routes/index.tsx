import { NavigationContainer } from '@react-navigation/native';
import { Box } from "native-base";

import { AppRoutes } from "./app.routes";

import { Signin } from "@/screens/SignIn";

import { useAuth } from "@/contexts/AuthContext";

export function Routes() {
  const { user } = useAuth();

  return (
    <Box flex={1} bgColor={"gray.900"}>
      <NavigationContainer>
        {user?.name
          ? <AppRoutes />
          : <Signin />
        }
      </NavigationContainer>
    </Box>
  );
}