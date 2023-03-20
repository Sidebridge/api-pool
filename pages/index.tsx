import Head from "next/head";

import type { NextPage } from "next";

import Hero from "@/components/landing-page/HeroSection";
import Explore from "@/components/landing-page/ExploreSection";
import Footer from "@/components/common/layout/Footer";
import MainLayout from "@/components/layout/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout>
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

      <main className="relative w-screen align-col">
        <div className="w-full align-col scroll">
          <Hero />
          <Explore />
        </div>
      </main>
    </MainLayout>
  );
};

export default Home;
