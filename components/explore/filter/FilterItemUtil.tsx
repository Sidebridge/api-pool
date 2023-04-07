import clsx from "clsx";

import AppIcon from "@/components/common/icons";
import FilterTitle from "./FilterTitle";
import FilterItem from "./FilterItem";
import { useEffect, useState } from "react";
import { filterCountryByNameAndAlphaCode } from "@/utils/helper/filters";

type FilterItemUtilProps = {
  filterSection: string;
  allItems: any[];
  labelProp?: string;
  labelPrefixProp?: string;
  selectedFilterProp?: string;
  deep?: boolean;
  iconProp?: string;
  selectedFilterValues: { [key: string]: string[] };
  filterTextLength?: number;
  filterValueProp?: string;
  filterHandler: Function;
  onCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
};

const FilterItemUtil = ({
  filterSection,
  allItems,
  labelProp = "",
  labelPrefixProp = "",
  selectedFilterProp = "",
  deep = true,
  iconProp = "",
  selectedFilterValues,
  filterTextLength = 15,
  filterValueProp = "",
  filterHandler,
  onCheck,
  onReset,
}: FilterItemUtilProps) => {
  const [filterSearchTerm, setFilterSearchTerm] = useState<string>("");
  const [isFilterExpanded, setIsFilterExpanded] = useState<boolean>(false);

  function expandedFilterHandler(val: boolean) {
    if (!val) {
      setFilterSearchTerm("");
    }

    setIsFilterExpanded(val);
  }

  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  useEffect(() => {
    const matchingItems = filterHandler(allItems, filterSearchTerm);

    setFilteredItems(matchingItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allItems, filterSearchTerm]);

  return (
    <div
      id={`${filterSection}-filter`}
      className="relative w-full mb-8 align-col"
    >
      <FilterTitle title={filterSection} onReset={onReset} />

      {!(allItems && allItems.length) && (
        <AppIcon name="loader" icon="LoaderGif" styles="w-6 mx-auto my-10" />
      )}

      <div
        className={clsx(
          "w-full align-col",
          isFilterExpanded &&
            "border border-opacity-25 border-primary p-5 pt-3 rounded-lg bg-dark-matte shadow-[0_20px_50px_-15px_rgba(255,255,255,0.1)]"
        )}
      >
        {isFilterExpanded && (
          <div className="w-full align-col">
            <p
              className={clsx(
                "font-light text-center text-grey-legacy press pb-3",
                "hover:text-light"
              )}
              onClick={() => expandedFilterHandler(false)}
            >
              collapse &darr;
            </p>

            <input
              type="search"
              className={clsx(
                "w-full h-10 bg-transparent text-light py-3 box-border border border-grey border-opacity-10 rounded mb-4 px-3",
                "focus:outline-none  placeholder:text-sm placeholder:text-grey placeholder:font-light"
              )}
              placeholder={`Search ${filterSection.toLowerCase()}`}
              onChange={(e) => setFilterSearchTerm(e.target.value)}
            />
          </div>
        )}

        <div
          className={clsx(
            "w-full align-col",
            "overflow-y-scroll",
            isFilterExpanded && "h-72"
          )}
        >
          {filteredItems
            ?.slice(0, isFilterExpanded ? filteredItems.length : 10)
            .map((item: { [key: string]: string | any }, index) => (
              <FilterItem
                key={`${filterSection}-filter-item-${index}`}
                styles="mb-10"
                label={
                  labelProp
                    ? `${
                        labelPrefixProp ? `(${item[labelPrefixProp]}) ` : ""
                      }${String(item[labelProp]).substring(
                        0,
                        filterTextLength
                      )}${
                        String(item[labelProp]).length > filterTextLength
                          ? "..."
                          : ""
                      }`
                    : String(item)
                }
                value={
                  filterValueProp
                    ? (item[filterValueProp] as string)
                    : String(item).toLowerCase()
                }
                iconUrl={
                  filterSection === "Country" ? String(item["flags"].svg) : null
                }
                iconName={iconProp ? String(item[iconProp]) : null}
                checked={
                  deep
                    ? selectedFilterValues[selectedFilterProp].includes(
                        String(item[filterValueProp])
                      )
                    : selectedFilterValues[selectedFilterProp].includes(
                        String(item).toLowerCase()
                      )
                }
                onCheck={(e) => onCheck(e)}
              />
            ))}
        </div>

        {allItems?.length > 10 && !isFilterExpanded && (
          <p
            className="mt-1 text-sm font-light text-center text-blue-400 press"
            onClick={() => expandedFilterHandler(true)}
          >
            Expand {filterSection.toLowerCase()} options &rarr;
          </p>
        )}
      </div>
    </div>
  );
};

export default FilterItemUtil;
