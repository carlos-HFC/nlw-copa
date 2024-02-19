import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { api } from "@/services/api";

interface AuthContextProps {
  isUserLoading: boolean;
  user: User;
  signIn(): Promise<void>;
}

WebBrowser.maybeCompleteAuthSession();

export const AuthContext = createContext({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider(props: Readonly<PropsWithChildren>) {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState({} as User);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "",
    clientSecret: "",
    redirectUri: AuthSession.makeRedirectUri(),
    scopes: ['profile', 'email']
  });

  useEffect(() => {
    getUserInStorage();
  }, []);

  useEffect(() => {
    if (response?.type === 'success' && response.authentication.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  async function getUserInStorage() {
    const data = await AsyncStorage.getItem("user");

    setUser(JSON.parse(data));
  }

  async function saveUserInStorage(data: User) {
    setUser(data);
    await AsyncStorage.setItem("user", JSON.stringify(data));
  }

  async function signInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true);

      const tokenResponse = await api.post('/users', {
        access_token
      });

      api.defaults.headers.common.Authorization = `Bearer ${tokenResponse.data.token}`;

      const userInfoResponse = await api.get("/me");

      saveUserInStorage(userInfoResponse.data.user);
    } catch (error) {
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signIn() {
    setIsUserLoading(true);

    try {
      await promptAsync();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  const value = {
    isUserLoading,
    signIn,
    user
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}