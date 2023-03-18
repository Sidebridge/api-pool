import useSuperbase from "@/hooks/use-superbase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const SupabaseAuthUI = () => {
  const { supabaseClient } = useSuperbase();

  return (
    <div className="w-full p-8">
      <h1 className="text-3xl font-semibold text-white">Hey 👋🏼, Login!</h1>
      <p className="mt-2 mb-8 font-light text-grey">
        Login to access more actions like: <br />
        Adding reviews, bookmarking APIs, and stay notified.
      </p>
      <Auth
        supabaseClient={supabaseClient}
        appearance={{ theme: ThemeSupa }}
        providers={["google", "github", "apple"]}
        theme="dark"
      />
    </div>
  );
};

export default SupabaseAuthUI;
