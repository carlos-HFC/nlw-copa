import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

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
    clientId: "490084834426-7sp05a9qnrloo7u61o9kqe0ltvh60e0s.apps.googleusercontent.com",
    clientSecret: "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",
    redirectUri: AuthSession.makeRedirectUri(),
    scopes: ['profile', 'email']
  });

  useEffect(() => {
    if (response?.type === 'success' && response.authentication.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  async function signInWithGoogle(token: string) {
    console.log('token', token);
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