import Head from "next/head";

import type { NextPage } from "next";

import Hero from "@/components/landing-page/HeroSection";
import Explore from "@/components/landing-page/ExploreSection";
import Footer from "@/components/common/layout/Footer";
import MainLayout from "@/components/layout/MainLayout";
import { useEffect, useState } from "react";

import { supabaseClient } from "@/utils/services/supabase/client";
import type { ApiService } from "@/types/api-service.interface";

import { getFeaturedAPIs, featuredApiServices } from "@/store/api-services";
import NewsletterSub from "@/components/landing-page/NewsletterSub";

const Home: NextPage = () => {
  const featuredAPIs = featuredApiServices.use();

  useEffect(() => {
    getFeaturedAPIs();
  }, []);

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
        <meta name="robots" content="noindex"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative w-screen align-col">
        <div className="w-full align-col scroll">
          <Hero />
          <Explore services={featuredAPIs} />
          <NewsletterSub />
        </div>
      </main>
    </MainLayout>
  );
};

export default Home;
