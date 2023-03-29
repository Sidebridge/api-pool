import clsx from "clsx";
import { NextPage } from "next";
import { useEffect, useState } from "react";

import MainLayout from "@/components/layout/MainLayout";
import SearchInput from "@/components/common/util/SearchInput";
import ApiCard from "@/components/common/util/ApiCard";
import FilterList from "@/components/explore/FilterList";

import type { ApiService } from "@/types/api-service.interface";

import {
  featuredApiServices,
  commonApiServices,
  getFeaturedAPIs,
  getCommonAPIServices,
} from "@/store/api-services";

const Explore: NextPage = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const featuredApis = featuredApiServices.use();
  const commonApis = commonApiServices.use();

  const [allApiServices, setAllApiServices] = useState<ApiService[]>([]);
  const [isSearchingApis, setIsSearchingApis] = useState<boolean>(false);

  function cardHoverHandler(card: string | null) {
    setHoveredCard(card);
  }

  async function searchApiService(searchTerm: string) {
    setIsSearchingApis(true);
    await getCommonAPIServices(searchTerm);

    setIsSearchingApis(false);
  }

  useEffect(() => {
    getFeaturedAPIs();

    getCommonAPIServices("");
  }, []);

  useEffect(() => {
    const allApis = [...featuredApis, ...commonApis];

    setAllApiServices(allApis);
  }, [featuredApis, commonApis]);

  return (
    <MainLayout>
      <div className="items-center w-full px-24 align-col">
        <div className="w-full py-16 text-center explore-header centered-col">
          <h1 className="text-5xl font-bold text-light">
            Find The Right API Services
          </h1>
          <p className="mt-6 text-xl font-light text-grey">
            Quickly find the right API. Filter by category, company, function.{" "}
            <br />
            Detailed info, code, reviews. Latest offerings from top companies.
            <br />
            Search now!
          </p>
        </div>

        <section className="w-full mb-32 border align-row border-grey-faint rounded-3xl bg-dark-matte">
          <FilterList />

          <div className="w-9/12 h-full border-l-2 align-col border-grey-faint">
            <div className="items-center w-full h-20 px-10 font-light border-b row-btwn text-light border-grey border-opacity-10">
              <SearchInput
                style="h-12 border-opacity-30 w-8/12"
                placeholder="Search API services by name or description"
                processing={isSearchingApis}
                onClick={(value) => {
                  searchApiService(value);
                }}
                onSearch={(searchTerm) => searchApiService(searchTerm)}
              />

              <span className="text-grey">All API: 345</span>
            </div>

            <div
              className={clsx(
                "flex-wrap content-start justify-between w-full px-10 mt-5 featured-list align-row gap-x-1"
              )}
            >
              {allApiServices.map((service) => (
                <div
                  className="mb-12 h-fit press"
                  style={{ width: "49%" }}
                  key={service?.service_id}
                  onMouseEnter={() => cardHoverHandler(service.service_id)}
                  onMouseLeave={() => cardHoverHandler(null)}
                >
                  <ApiCard
                    service={service}
                    isHovered={hoveredCard === service?.service_id}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Explore;
