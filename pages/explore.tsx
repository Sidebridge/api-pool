import clsx from "clsx";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

import MainLayout from "@/components/layout/MainLayout";
import CustomInput from "@/components/common/util/CustomButtonedInput";
import ApiCard from "@/components/common/util/ApiCard";
import FilterList from "@/components/explore/filter/FilterList";

import type { ApiService } from "@/types/api-service.interface";

import {
  featuredApiServices,
  commonApiServices,
  getFeaturedAPIs,
  getCommonAPIServices,
} from "@/store/api-services";
import { Tooltip } from "antd";
import AppIcon from "@/components/common/icons";

const Explore: NextPage = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const featuredApis = featuredApiServices.use();
  const commonApis = commonApiServices.use();

  const [isSearchingApis, setIsSearchingApis] = useState<boolean>(false);

  function cardHoverHandler(card: string | null) {
    setHoveredCard(card);
  }

  async function searchApiService(searchTerm?: string, filterObj?: object) {
    let searchText: string = "";

    if (searchTerm) searchText = searchTerm;
    else {
      if (searchInputRef && searchInputRef.current) {
        searchText = searchInputRef.current.value;
      }
    }

    setIsSearchingApis(true);
    await getCommonAPIServices(searchText, filterObj);

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
          <h1 className="text-5xl font-bold text-light">
            Find The Right API Services
          </h1>
          <p className="mt-6 text-xl font-light text-grey">
            Easily find the right API for your next project. Filter by tags,
            availability, function and more. <br />
            Detailed info, helpers, & accurate reviews. Latest offerings from
            top companies.
            <br />
            Search now!
          </p>
        </div>

        <section className="w-full mb-32 border align-row border-grey-faint rounded-3xl bg-dark-matte">
          <FilterList
            onFiltered={(filterObject) => {
              searchApiService("", filterObject);
            }}
          />

          <div className="w-9/12 h-full align-col ">
            <div className="items-center w-full h-20 px-10 font-light border-b row-btwn text-light border-grey border-opacity-10">
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
            </div>

            <div className={clsx("w-full px-10 featured-list")}>
              <div
                className={clsx(
                  "align-row",
                  "content-start justify-between w-full overflow-x-scroll mt-5 gap-x-3"
                )}
              >
                {featuredApis.map((service, serviceIndex) => (
                  <div
                    className={clsx("mb-8 h-fit press w-96")}
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
                {featuredApis.map((service, serviceIndex) => (
                  <div
                    className={clsx("mb-8 h-fit press w-96")}
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
                {featuredApis.map((service, serviceIndex) => (
                  <div
                    className={clsx("mb-8 h-fit press w-96")}
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

              <div className="w-full">
                <div className="items-center align-row">
                  <div className="flex flex-grow border border-dashed light-border"></div>
                  <span className="mx-2 text-lg text-grey-legacy">Results</span>
                  <div className="flex flex-grow border border-dashed light-border"></div>
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
                      <span className="text-lg text-grey">
                        Your search did not match any available data.
                      </span>

                      <button className="p-3 px-5 mt-6 rounded-full bg-primary press">
                        Use AI Search &#10024;
                      </button>
                    </div>
                  )}

                <div
                  className={clsx(
                    "flex-wrap content-start justify-between w-full mt-5 align-row gap-x-1"
                  )}
                >
                  {commonApis.map((service, serviceIndex) => (
                    <div
                      className={clsx("mb-8 h-fit press")}
                      style={{ width: "49%" }}
                      key={serviceIndex}
                      onMouseEnter={() => cardHoverHandler(service.service_id)}
                      onMouseLeave={() => cardHoverHandler(null)}
                    >
                      <ApiCard
                        service={service}
                        isHovered={hoveredCard === service.service_id}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Explore;
