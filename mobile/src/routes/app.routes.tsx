import { Feather, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from "native-base";
import { Platform } from "react-native";

import { NewPoll } from "@/screens/NewPoll";
import { Polls } from "@/screens/Polls";
import { FindPoll } from "@/screens/FindPoll";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, sizes } = useTheme();

  const size = sizes[6];

  return (
    <Navigator
      screenOptions={{
        tabBarLabelPosition: "beside-icon",
        headerShown: false,
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: "absolute",
          height: sizes[22],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800]
        },
        tabBarItemStyle: {
          position: "relative",
          top: Platform.OS === 'android' ? -10 : 0,
        },
        tabBarLabelStyle: {
          marginTop: 0
        }
      }}
    >
      <Screen
        name="new"
        component={NewPoll}
        options={{
          tabBarIcon: ({ color }) => <Feather name="plus-circle" color={color} size={size} />,
          tabBarLabel: "Novo bolão"
        }}
      />

      <Screen
        name="polls"
        component={Polls}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="football-outline" color={color} size={size} />,
          tabBarLabel: "Meus bolões"
        }}
      />

      <Screen
        name="find"
        component={FindPoll}
        options={{
          tabBarButton: () => void 0
        }}
      />
    </Navigator>
  );
}