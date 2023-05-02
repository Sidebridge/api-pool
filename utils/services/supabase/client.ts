import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export const supabaseClient = createClient(
  String(process.env.NEXT_PUBLIC_SUPABASE_URL),
  String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
);

export async function fetcher(table: string) {
  const { data, error } = await supabaseClient.from(table).select("*");

  if (error) {
    throw error;
  }

  return data;
}
