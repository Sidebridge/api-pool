import { createClient } from "@supabase/supabase-js";
import { config } from "@/config";

console.log("Hollllla", process.env);

const useSuperbase = () => {
  const supabaseClient = createClient(
    "https://kahbgofqjzojjorjdsno.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthaGJnb2Zxanpvampvcmpkc25vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg4OTMyMTgsImV4cCI6MTk5NDQ2OTIxOH0.DtG8olYwPCA29eSUBUyGT_N4tdyXqgxzdzuvZ7GrHVk"
  );

  return {
    supabaseClient,
  };
};

export default useSuperbase;
