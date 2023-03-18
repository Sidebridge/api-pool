import useSuperbase from "@/hooks/use-superbase";

import { Provider } from "@supabase/supabase-js";
import { fail } from "assert";
import { useState } from "react";

import { toggleLoginState } from "@/store/auth";

const useAuth = () => {
  const { supabaseClient } = useSuperbase();

  const [isLoggingIn, setLoggingState] = useState(false);

  const login = async (provider: Provider) => {
    setLoggingState(true);

    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        queryParams: {
          // access_type: "offline",
          prompt: "consent",
        },
        redirectTo: "",
      },
    });

    if (error) {
      console.log(error);
      setLoggingState(false);
      return fail("Something went wrong!");
    }

    if (data) {
      console.log("returned data :", data);
    }
  };

  return {
    login,
    isLoggingIn,
  };
};

export default useAuth;
