import Plunk from "@plunk/node";

// const plunkKey = process.env.NEXT_PUBLIC_PLUNK_PUBLIC_KEY;
const plunkKey = "pk_26302c914c40cfbfd35cc39ff7459c6b03cee16065e9a1f1";

if (!plunkKey) {
  throw new Error();
}

export const plunk = new Plunk(plunkKey);
