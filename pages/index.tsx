import Head from "next/head";
import type { NextPage } from "next";
import { useEffect } from "react";

import Hero from "@/components/landing-page/HeroSection";
import Explore from "@/components/landing-page/ExploreSection";
import MainLayout from "@/components/layout/MainLayout";

import { getFeaturedAPIs, featuredApiServices } from "@/store/api-services";
import NewsletterSub from "@/components/landing-page/NewsletterSub";
import PromoSection from "@/components/landing-page/PromoSection";

const Home: NextPage = () => {
  const featuredAPIs = featuredApiServices.use();

  useEffect(() => {
    getFeaturedAPIs();
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>
          APIPool | Discover API products & services for your next project.
        </title>
        <meta
          name="description"
          content="A pool of API and third-party services from around the world and of diverse use cases."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative w-screen align-col">
        <div className="w-full align-col scroll">
          <Hero />
          <Explore
            tag="Featured Lists 🔥"
            title="Featured APIs"
            subtitle="Simplify Your Development Workflow with these featured API’s - The
          Game-Changing Solution for All Your Integration Needs"
            cardSize="26.4rem"
            services={featuredAPIs}
          />
          <PromoSection />
          <NewsletterSub />
        </div>
      </main>
    </MainLayout>
  );
};

export default Home;
