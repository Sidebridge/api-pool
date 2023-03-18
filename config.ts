const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    );
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

console.log("From config: ", process.env);

export const config = {
  supabaseURL: getEnvironmentVariable("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: getEnvironmentVariable("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
};
