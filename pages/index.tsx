import Head from "next/head";

import type { NextPage } from "next";

import Hero from "@/components/landing-page/HeroSection";
import Explore from "@/components/landing-page/ExploreSection";
import Footer from "@/components/common/layout/Footer";

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

      <main className="w-screen flex flex-col relative">
        <Hero />
        <Explore />
        <section
          id="footer"
          className="w-full p-20 py-10 border-t border-grey-light bg-dark-matte"
        >
          <Footer />
        </section>
      </main>
    </>
  );
};

export default Home;
