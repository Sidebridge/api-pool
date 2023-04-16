import { Provider } from "@supabase/supabase-js";
import clsx from "clsx";

import AuthIntegrations from "@/public/constants/integrations";

// import useAuth from "@/hooks/use-auth";
import { useAuth } from "@/store/context/AuthProvider";

import BasePill from "../common/base/BasePill";
import AppIcon from "../common/icons";
import { useState } from "react";
import { useRouter } from "next/router";

const LoginOptions = () => {
  // const { login, isLoggingIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (provider: Provider) => {
    // try {
    //   setLoading(true);
    //   const { data, error } = await login(provider);
    //   if (error) {
    //     console.log("Login error: ", error);
    //     throw new Error("Login failed");
    //   }
    //   if (data) router.push("/");
    // } catch (error) {
    //   console.log(error);
    //   setLoading(false);
    // }
  };

  return (
    <div className="w-full p-8 align-col">
      <h1 className="text-3xl font-semibold text-white">Hey 👋🏼, Login!</h1>
      <p className="mt-2 font-light text-grey">
        Login to access more actions like: <br />
        Adding reviews, bookmarking APIs, and stay notified.
      </p>

      {loading && (
        <div className="items-center mx-auto mt-10 mb-4 align-col">
          <AppIcon name="loader" icon="LoaderGif" styles="w-6 h-6" />
          <span className="mt-1 text-sm font-light text-light">
            Please wait...
          </span>
        </div>
      )}

      {!loading && (
        <div
          className={clsx(
            "flex-wrap items-center w-full mt-8 row-btwn gap-x-4",
            loading && "disabled"
          )}
        >
          {AuthIntegrations.map((integration) => (
            <BasePill
              key={integration.name}
              text={`Login with ${integration.name}`}
              preIcon={integration.icon}
              styles="flex-grow mb-4 press border-2"
              onClick={() =>
                handleLogin(integration.name.toLowerCase() as Provider)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LoginOptions;
