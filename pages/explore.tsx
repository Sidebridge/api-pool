import clsx from "clsx";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

import Slider from "react-slick";

import classes from "@/styles/landing-page.module.css";

import MainLayout from "@/components/layout/MainLayout";
import CustomInput from "@/components/common/util/CustomButtonedInput";
import ApiCard from "@/components/common/util/ApiCard";
import AppIcon from "@/components/common/icons";
import BaseButton from "@/components/common/base/BaseButton";
import FilterUtil from "@/components/explore/filter/FilterUtil";

import type { ApiService } from "@/types/api-service.type";

import {
  featuredApiServices,
  commonApiServices,
  getFeaturedAPIs,
  getCommonAPIServices,
} from "@/store/api-services";

import { ApiFilters } from "@/public/constants/filters";
import { Tooltip } from "antd";

const Explore: NextPage = () => {
  const sliderConfig = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500,
    slidesToShow: 2.6,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: "65px",
    pauseOnHover: true,
  };

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
                      "w-full box-border overflow-x-hidden mt-8 px-8"
                    )}
                  >
                    <Slider {...sliderConfig} className={clsx("")}>
                      {featuredApis.map((service, serviceIndex) => (
                        <div
                          className={clsx("mb-8 h-fit px-2.5 press")}
                          style={{ minWidth: "22rem" }}
                          key={serviceIndex}
                        >
                          <ApiCard
                            service={service}
                            type="small"
                            isHovered={hoveredCard === service.service_id}
                            onMouseEnter={() =>
                              cardHoverHandler(service.service_id)
                            }
                            onMouseLeave={() => cardHoverHandler(null)}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              )}

            <div className={clsx("w-full result-list border-dark")}>
              <div className="w-full">
                <div className="section-header-tab">
                  <p className={clsx("mx-auto section-header-title")}>
                    {isSearchOrFilterApplied ? "Search Results" : "All APIs"}
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

                      <Tooltip title="Coming Soon ✨" placement="bottom">
                        <button className="p-3.5 px-5 mt-6 border rounded-full hover:bg-accent hover:text-body border-grey-border text-light press focus:outline-none">
                          <div className="centered-row">
                            <AppIcon icon="MagicWand" styles="mr-2 w-5 h-5" />
                            <span>Use AI Search </span>{" "}
                          </div>
                        </button>
                      </Tooltip>
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
