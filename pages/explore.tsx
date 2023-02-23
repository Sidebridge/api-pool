import clsx from "clsx";
import { NextPage } from "next";
import { useState } from "react";

import ExploreFilters from "@/public/constants/filters";

import MainLayout from "@/components/layout/MainLayout";
import { Button } from "antd";
import FilterList from "@/components/common/util/FilterList";
import SearchInput from "@/components/common/util/SearchInput";
import ApiCard from "@/components/common/util/ApiCard";

const Explore: NextPage = () => {
  const hey = (val: unknown) => {
    console.log(val);
  };

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  function cardHoverHandler(card: number | null) {
    setHoveredCard(card);
  }

  return (
    <MainLayout>
      <div className="w-full align-col items-center px-24">
        <div className="explore-header centered-col w-full py-16 text-center">
          <h1 className="text-5xl text-light font-bold">
            Find The Right API Services
          </h1>
          <p className="text-grey mt-6 text-xl font-light">
            Quickly find the right API. Filter by category, company, function.{" "}
            <br />
            Detailed info, code, reviews. Latest offerings from top companies.
            <br />
            Search now!
          </p>
        </div>

        <section className="w-full align-row border border-grey-faint rounded-3xl bg-dark-matte mb-32">
          <div className="w-3/12 h-full  align-col">
            <div className="row-btwn items-center h-20 px-6 text-light font-light border-b border-grey border-opacity-10">
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

            <div className="w-full align-col p-4 px-6">
              <div id="country-filter" className="w-full align-col mb-5">
                <p className="text-grey font-light mb-3">Country</p>

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

              <div id="sector-filter" className="w-full align-col mb-5">
                <p className="text-grey font-light mb-3">Sector</p>

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

              <div id="lang-filter" className="w-full align-col mb-5">
                <p className="text-grey font-light mb-3">Language Support</p>

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

              <div id="lang-filter" className="w-full align-col mb-5">
                <p className="text-grey font-light mb-3">Pricing</p>

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

          <div className="w-9/12 h-full align-col border-l-2 border-grey-faint">
            <div className="w-full row-btwn items-center h-20 px-10 text-light font-light border-b border-grey border-opacity-10">
              <SearchInput style="h-12 border-opacity-30 w-8/12" />

              <span className="text-grey">All API: 345</span>
            </div>

            <div className="featured-list w-full px-10 align-row flex-wrap justify-between gap-x-1 content-start mt-5">
              {[1, 2, 3, 4, 5, 6].map((card) => (
                <div
                  className="h-fit mb-12 press"
                  style={{ width: "49%" }}
                  key={card}
                  onMouseEnter={() => cardHoverHandler(card)}
                  onMouseLeave={() => cardHoverHandler(null)}
                >
                  <ApiCard isHovered={hoveredCard === card} />
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
