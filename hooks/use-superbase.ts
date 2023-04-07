import { createClient } from "@supabase/supabase-js";
import { config } from "@/config";

const useSuperbase = () => {
  const supabaseClient = createClient(
    String(process.env.NEXT_PUBLIC_SUPABASE_URL),
    String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );

  return {
    supabaseClient,
  };
};

export default useSuperbase;
