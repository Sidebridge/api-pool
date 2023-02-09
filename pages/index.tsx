import Head from "next/head";

import type { NextPage } from "next";

import Hero from "@/components/landing-page/Hero";
type Prop = {};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          APIPool - Find third-party api and services for your next project.
        </title>
        <meta
          name="description"
          content="A pool of API and third-party services from around the world and of diverse use cases."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col relative">
        <Hero />
      </main>
    </>
  );
};

export default Home;
