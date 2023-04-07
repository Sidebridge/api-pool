import Plunk from "@plunk/node";

// const plunkKey = process.env.NEXT_PUBLIC_PLUNK_PUBLIC_KEY;
const plunkKey = process.env.NEXT_PUBLIC_PLUNK_PUBLIC_KEY;

if (!plunkKey) {
  throw new Error();
}

export const plunk = new Plunk(plunkKey);
