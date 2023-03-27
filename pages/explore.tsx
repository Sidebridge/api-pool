import clsx from "clsx";
import { NextPage } from "next";
import { useEffect, useState } from "react";

import ExploreFilters from "@/public/constants/filters";

import MainLayout from "@/components/layout/MainLayout";
import { Button } from "antd";
import FilterList from "@/components/common/util/FilterList";
import SearchInput from "@/components/common/util/SearchInput";
import ApiCard from "@/components/common/util/ApiCard";
import type { ApiService } from "@/types/api-service.interface";

import {
  featuredApiServices,
  commonApiServices,
  getFeaturedAPIs,
  getCommonAPIServices,
} from "@/store/api-services";

const Explore: NextPage = () => {
  const hey = (val: unknown) => {
    console.log(val);
  };

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const featuredApis = featuredApiServices.use();
  const commonApis = commonApiServices.use();

  const [allApiServices, setAllApiServices] = useState<ApiService[]>([]);

  function cardHoverHandler(card: string | null) {
    setHoveredCard(card);
  }

  useEffect(() => {
    getFeaturedAPIs();

    getCommonAPIServices();
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
          <div className="w-3/12 h-full align-col">
            <div className="items-center h-20 px-6 font-light border-b row-btwn text-light border-grey border-opacity-10">
              <span className="">Filter By 👇🏼</span>

              <Button
                className={clsx(
                  "border border-grey-faint h-10 w-fit press font-light text-light text-sm bg-opacity-10 bg-grey",
                  "hover:bg-red-500"
                )}
                shape="round"
                type="ghost"
                icon=""
              >
                Reset Filter
              </Button>
            </div>

            <div className="w-full p-4 px-6 align-col">
              <div id="country-filter" className="w-full mb-5 align-col">
                <p className="mb-3 font-light text-grey">Country</p>

                <div className="w-full align-col">
                  {ExploreFilters.country.map((filter) => (
                    <FilterList
                      styles="mb-10"
                      label={filter.name}
                      count={filter.resultCount}
                      value={filter.name}
                      key={filter.name}
                      onCheck={() => {
                        hey(filter.name);
                      }}
                    />
                  ))}
                </div>
              </div>

              <div id="sector-filter" className="w-full mb-5 align-col">
                <p className="mb-3 font-light text-grey">Sector</p>

                <div className="w-full align-col">
                  {ExploreFilters.sector.map((filter) => (
                    <FilterList
                      styles="mb-10"
                      label={filter.name}
                      count={filter.resultCount}
                      value={filter.name}
                      key={filter.name}
                      onCheck={() => {
                        hey(filter.name);
                      }}
                    />
                  ))}
                </div>
              </div>

              <div id="lang-filter" className="w-full mb-5 align-col">
                <p className="mb-3 font-light text-grey">Language Support</p>

                <div className="w-full align-col">
                  {ExploreFilters.langSupport.map((filter) => (
                    <FilterList
                      styles="mb-10"
                      label={filter.name}
                      count={filter.resultCount}
                      value={filter.name}
                      key={filter.name}
                      onCheck={() => {
                        hey(filter.name);
                      }}
                    />
                  ))}
                </div>
              </div>

              <div id="lang-filter" className="w-full mb-5 align-col">
                <p className="mb-3 font-light text-grey">Pricing</p>

                <div className="w-full align-col">
                  {ExploreFilters.pricing.map((filter) => (
                    <FilterList
                      styles="mb-10"
                      label={filter.name}
                      count={filter.resultCount}
                      value={filter.name}
                      key={filter.name}
                      onCheck={() => {
                        hey(filter.name);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-9/12 h-full border-l-2 align-col border-grey-faint">
            <div className="items-center w-full h-20 px-10 font-light border-b row-btwn text-light border-grey border-opacity-10">
              <SearchInput style="h-12 border-opacity-30 w-8/12" />

              <span className="text-grey">All API: 345</span>
            </div>

            <div className="flex-wrap content-start justify-between w-full px-10 mt-5 featured-list align-row gap-x-1">
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
