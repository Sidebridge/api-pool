import clsx from "clsx";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

import classes from "@/styles/landing-page.module.css";

import MainLayout from "@/components/layout/MainLayout";
import CustomInput from "@/components/common/util/CustomButtonedInput";
import ApiCard from "@/components/common/util/ApiCard";
import AppIcon from "@/components/common/icons";
import BaseButton from "@/components/common/base/BaseButton";
import FilterUtil from "@/components/explore/filter/FilterUtil";

import type { ApiService } from "@/types/api-service.interface";

import {
  featuredApiServices,
  commonApiServices,
  getFeaturedAPIs,
  getCommonAPIServices,
} from "@/store/api-services";

import { ApiFilters } from "@/public/constants/filters";

const Explore: NextPage = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const featuredApis = featuredApiServices.use();
  const commonApis = commonApiServices.use();

  const [isSearchOrFilterApplied, setIsFilterApplied] = useState<boolean>();
  const [isSearchingApis, setIsSearchingApis] = useState<boolean>(false);

  function cardHoverHandler(card: string | null) {
    setHoveredCard(card);
  }

  async function searchApiService(searchTerm?: string, filterObj?: ApiFilters) {
    let searchText: string = "";

    if (searchTerm) searchText = searchTerm;
    else {
      if (searchInputRef && searchInputRef.current) {
        searchText = searchInputRef.current.value;
      }
    }

    setIsSearchingApis(true);
    await getCommonAPIServices(searchText, filterObj);

    if (
      searchTerm ||
      (filterObj &&
        (filterObj.countries.length ||
          filterObj.sectors.length ||
          filterObj.supportedLanguages.length ||
          filterObj.pricings.length))
    )
      setIsFilterApplied(true);
    else setIsFilterApplied(false);

    setIsSearchingApis(false);
  }

  useEffect(() => {
    getFeaturedAPIs();

    getCommonAPIServices("");
  }, []);

  return (
    <MainLayout>
      <div className="items-center w-full px-24 align-col">
        <div className="w-full py-16 text-center explore-header centered-col">
          <h1
            className={clsx("text-5xl font-medium", classes["header-text__bg"])}
          >
            Explore Thousands of API Services
          </h1>
          <p className="mt-4 text-lg font-normal text-grey-legacy">
            Easily find the right API for your next project. Filter by tags,
            availability, function and more. <br />
            Detailed info, helpers, & accurate reviews. Latest offerings from
            top companies.
            <br />
            Search now!
          </p>
        </div>

        <section className="w-full mb-32 align-col">
          {/* <div className="items-center w-full h-20 px-8 font-light border-b row-btwn text-light border-grey border-opacity-10">
              <div className="items-center w-9/12 align-row">
                <CustomInput
                  ref={searchInputRef}
                  style="h-12 border-opacity-30 w-8/12 flex flex-grow"
                  placeholder="Search API services by name or description"
                  btnText="Search"
                  processing={isSearchingApis}
                  icon="Search"
                  onClick={(searchTerm) => {
                    searchApiService(searchTerm as string);
                  }}
                  onChange={() => {}}
                  onEnter={(searchTerm) => searchApiService(searchTerm)}
                />

                <Tooltip title="Coming Soon ✨" placement="topLeft">
                  <p className="ml-3 text-sm cursor-pointer text-primary hover:opacity-40">
                    Advance AI search
                  </p>
                </Tooltip>
              </div>

              <span className="text-grey">All API: 34,557</span>
            </div> */}
          <FilterUtil
            isSearching={isSearchingApis}
            onFiltered={(searchString, filterSelections) =>
              searchApiService(searchString, filterSelections)
            }
          />

          <div className="w-full mt-4 overflow-x-hidden border rounded-t-none align-col border-dark rounded-xl">
            {featuredApis &&
              featuredApis.length &&
              !isSearchOrFilterApplied && (
                <div className="w-full mb-3 featured-list border-dark">
                  <div className="section-header-tab">
                    <p className={clsx("mx-auto section-header-title")}>
                      Featured API’S 🔥
                    </p>
                  </div>
                  <div
                    className={clsx(
                      "align-row",
                      "content-start justify-between w-full px-8 box-border overflow-x-scroll mt-5 gap-x-3"
                    )}
                  >
                    {featuredApis.map((service, serviceIndex) => (
                      <div
                        className={clsx("mb-8 h-fit press w-96")}
                        style={{ minWidth: "22rem" }}
                        key={serviceIndex}
                        onMouseEnter={() =>
                          cardHoverHandler(service.service_id)
                        }
                        onMouseLeave={() => cardHoverHandler(null)}
                      >
                        <ApiCard
                          service={service}
                          type="small"
                          isHovered={hoveredCard === service.service_id}
                        />
                      </div>
                    ))}
                    {featuredApis.map((service, serviceIndex) => (
                      <div
                        className={clsx("mb-8 h-fit press w-96")}
                        style={{ minWidth: "22rem" }}
                        key={serviceIndex}
                        onMouseEnter={() =>
                          cardHoverHandler(service.service_id)
                        }
                        onMouseLeave={() => cardHoverHandler(null)}
                      >
                        <ApiCard
                          service={service}
                          type="small"
                          isHovered={hoveredCard === service.service_id}
                        />
                      </div>
                    ))}
                    {featuredApis.map((service, serviceIndex) => (
                      <div
                        className={clsx("mb-8 h-fit press w-96")}
                        style={{ minWidth: "22rem" }}
                        key={serviceIndex}
                        onMouseEnter={() =>
                          cardHoverHandler(service.service_id)
                        }
                        onMouseLeave={() => cardHoverHandler(null)}
                      >
                        <ApiCard
                          service={service}
                          type="small"
                          isHovered={hoveredCard === service.service_id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            <div className={clsx("w-full result-list border-dark")}>
              <div className="w-full">
                <div className="section-header-tab">
                  <p className={clsx("mx-auto section-header-title")}>
                    All APIs
                  </p>
                </div>

                <AppIcon
                  icon="LoaderGif"
                  name="loader"
                  styles={`w-10 h-10 mx-auto mt-16 mb-24 ${
                    !isSearchingApis && "hidden"
                  }`}
                />

                {(!commonApis || commonApis.length === 0) &&
                  !isSearchingApis && (
                    <div className="items-center my-20 align-col">
                      <AppIcon
                        name="error-illustration"
                        icon="ErrorBroken"
                        styles="w-64 mb-10"
                      />
                      <span className="text-lg font-light text-grey">
                        Your search did not match any available data.
                      </span>

                      <button className="p-3 px-5 mt-6 rounded-full bg-primary press">
                        Use AI Search &#10024;
                      </button>
                    </div>
                  )}

                <div
                  className={clsx(
                    "grid grid-flow-row grid-cols-3 px-8 box-border w-full mt-8 gap-x-5"
                  )}
                >
                  {commonApis.map((service, serviceIndex) => (
                    <div
                      className={clsx("mb-8 h-fit press")}
                      style={{ minWidth: "22rem" }}
                      key={serviceIndex}
                      onMouseEnter={() => cardHoverHandler(service.service_id)}
                      onMouseLeave={() => cardHoverHandler(null)}
                    >
                      <ApiCard
                        service={service}
                        type="small"
                        isHovered={hoveredCard === service.service_id}
                      />
                    </div>
                  ))}
                </div>

                {/* <div className="items-center mx-auto my-8 w-fit pagination-btns align-row">
                  <BaseButton
                    styles="mr-4 border border-dark text-grey-lighter px-6 hover:border-primary hover:text-primary"
                    type="default"
                    text="⇜ Previous"
                  />

                  <BaseButton
                    styles="mr-4 border border-dark text-grey-lighter px-6 hover:border-primary hover:text-primary"
                    type="default"
                    text="Next ⇝"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Explore;
