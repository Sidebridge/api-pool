import { supabaseClient } from "@/utils/services/supabase/client";
import {
  AuthError,
  OAuthResponse,
  Provider,
  User,
} from "@supabase/supabase-js";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextInterface {
  auth: boolean;
  user: User | null;
  login: (provider: Provider) => Promise<OAuthResponse>;
  signOut: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext({} as AuthContextInterface);

export const useAuth = () => useContext(AuthContext);

export const login = (provider: Provider) =>
  supabaseClient.auth.signInWithOAuth({
    provider,
    options: {
      queryParams: {
        // access_type: "offline",
        prompt: "consent",
      },
      redirectTo: "",
    },
  });

const signOut = () => supabaseClient.auth.signOut();

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [auth, setAuth] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabaseClient.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);
    };
    getUser();

    // Auth state change logic
    const { data } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user as User | null);
        setAuth(true);

        // console.log("user: ", session?.user);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
        router.push("/explore");
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <AuthContext.Provider value={{ auth, user, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
