import clsx from "clsx";

import { Button } from "antd";
import FilterItem from "@/components/common/util/FilterItem";

import ExploreFilters from "@/public/constants/filters";
import { useState } from "react";

const FilterUtil = () => {
  const hey = (val: unknown) => {
    console.log(val);
  };

  const [expandedFilters, setExpandedFilter] = useState<{
    [key: string]: boolean;
  }>({
    countries: false,
    bizDomain: false,
    langSupport: false,
    Pricing: false,
  });

  function expandedFilterHandler(filterTitle: string, val: boolean) {
    const filters = { ...expandedFilters };
    filters[filterTitle] = val;

    setExpandedFilter(filters);
  }

  return (
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
        <div id="country-filter" className="relative w-full mb-5 align-col">
          <p className="mb-3 font-light text-grey">Country</p>

          <div className="w-full align-col">
            {ExploreFilters.country.map((filter) => (
              <FilterItem
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

          {/* expanded popover */}

          {expandedFilters.countries && (
            <div className="absolute border border-opacity-25 border-primary z-50 w-full p-5 py-3 mt-8 rounded-lg bg-dark-matte shadow-[0_20px_50px_-15px_rgba(255,255,255,0.1)]">
              <p
                className={clsx(
                  "font-light text-center text-grey-legacy press pb-5",
                  "hover:text-light"
                )}
                onClick={() => expandedFilterHandler("countries", false)}
              >
                collapse &darr;
              </p>

              <div className="w-full overflow-y-scroll h-72">
                <div className="w-full align-col">
                  {ExploreFilters.country.map((filter) => (
                    <FilterItem
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
          )}

          <p
            className="mt-4 text-sm font-light text-center text-blue-400 press"
            onClick={() => expandedFilterHandler("countries", true)}
          >
            Expand options &rarr;
          </p>
        </div>

        <div id="sector-filter" className="relative w-full mb-5 align-col">
          <p className="mb-3 font-light text-grey">Sector</p>

          <div className="w-full align-col">
            {ExploreFilters.sector.map((filter) => (
              <FilterItem
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

          {/* <div className="absolute w-full border h-72 border-light"></div>

                <p className="mt-4 text-sm font-light text-center text-blue-400 cursor-pointer ">
                  See more options
                </p> */}
        </div>

        <div id="lang-filter" className="w-full mb-5 align-col">
          <p className="mb-3 font-light text-grey">Language Support</p>

          <div className="w-full align-col">
            {ExploreFilters.langSupport.map((filter) => (
              <FilterItem
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
              <FilterItem
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
  );
};

export default FilterUtil;
