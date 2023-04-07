import clsx from "clsx";

import { Button } from "antd";
import FilterItem from "@/components/explore/filter/FilterItem";

import {
  pricings,
  supportedLanguages,
  type ApiFilters,
} from "@/public/constants/filters";
import { useCallback, useEffect, useRef, useState } from "react";

import api from "@/utils/services/axios";
import useSWR from "swr";
import FilterTitle from "./FilterTitle";

import { supabaseClient } from "@/utils/services/supabase/client";
import FilterItemUtil from "./FilterItemUtil";
import {
  filterCountryByNameAndAlphaCode,
  filterItemsByName,
  filterItemsBySelfTitle,
} from "@/utils/helper/filters";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

const initialFilterObject: ApiFilters = {
  countries: [],
  sectors: [],
  supportedLanguages: [],
  pricings: [],
};

const FilterUtil = ({
  onFiltered,
}: {
  onFiltered: (filterObject: { [key: string]: any }) => void;
}) => {
  const {
    data: countries,
    error,
    isLoading: isLoadingCountries,
  } = useSWR("https://restcountries.com/v2/all", fetcher);

  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countrySearchTerm, setCountrySearchTerm] = useState<string>("");

  const [isSectorsLoading, setIsSectorsLoading] = useState<boolean>(false);
  const [apiServiceDomains, setApiServiceDomains] = useState([]);

  async function fetchAPIServiceSectors() {
    setIsSectorsLoading(true);
    const { data, error } = await supabaseClient
      .from("api_service_domains")
      .select("*");

    if (error) {
      setIsSectorsLoading(false);
      throw error;
    }

    if (data) {
      setApiServiceDomains(data as []);
    }

    setIsSectorsLoading(false);
  }

  const [selectedFilterValues, setSelectedFilterValues] = useState<{
    [key: string]: string[];
  }>(initialFilterObject);

  function handleFilterCheck(
    e: React.ChangeEvent<HTMLInputElement>,
    filterSection: string
  ) {
    const value = e.target.value;

    if (e.target.checked) {
      if (!selectedFilterValues[filterSection].includes(value)) {
        setSelectedFilterValues({
          ...selectedFilterValues,
          [filterSection]: [...selectedFilterValues[filterSection], value],
        });
      }
    } else {
      const valueIndex = selectedFilterValues[filterSection].indexOf(value);
      let valueCopy = [...selectedFilterValues[filterSection]];

      if (valueIndex !== -1) {
        valueCopy.splice(valueIndex, 1);
        setSelectedFilterValues({
          ...selectedFilterValues,
          [filterSection]: valueCopy,
        });
      }
    }
  }

  function resetFilters() {
    setSelectedFilterValues(initialFilterObject);
  }

  useEffect(() => {
    onFiltered(selectedFilterValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilterValues]);

  useEffect(() => {
    fetchAPIServiceSectors();
  }, []);

  return (
    <div className="flex flex-grow w-3/12 border-r-2 align-col border-grey-faint">
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
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </div>

      <div className="w-full p-4 px-6 align-col">
        <FilterItemUtil
          filterSection="Country"
          allItems={countries}
          labelProp="name"
          labelPrefixProp="alpha3Code"
          selectedFilterProp="countries"
          selectedFilterValues={selectedFilterValues}
          filterValueProp="name"
          filterHandler={filterCountryByNameAndAlphaCode}
          onCheck={(e) => handleFilterCheck(e, "countries")}
          onReset={() => {
            if (selectedFilterValues["countries"].length)
              setSelectedFilterValues({
                ...selectedFilterValues,
                countries: [],
              });
          }}
        />

        <FilterItemUtil
          filterSection="Sector"
          allItems={apiServiceDomains}
          labelProp="name"
          selectedFilterProp="sectors"
          selectedFilterValues={selectedFilterValues}
          filterValueProp="id"
          filterTextLength={30}
          filterHandler={filterItemsByName}
          onCheck={(e) => handleFilterCheck(e, "sectors")}
          onReset={() => {
            if (selectedFilterValues["sectors"].length)
              setSelectedFilterValues({
                ...selectedFilterValues,
                sectors: [],
              });
          }}
        />

        <FilterItemUtil
          filterSection="SDK Support"
          allItems={supportedLanguages}
          selectedFilterProp="supportedLanguages"
          deep={false}
          selectedFilterValues={selectedFilterValues}
          filterTextLength={30}
          filterHandler={filterItemsBySelfTitle}
          onCheck={(e) => handleFilterCheck(e, "supportedLanguages")}
          onReset={() => {
            if (selectedFilterValues["supportedLanguages"].length)
              setSelectedFilterValues({
                ...selectedFilterValues,
                supportedLanguages: [],
              });
          }}
        />

        <FilterItemUtil
          filterSection="Pricing"
          allItems={pricings}
          selectedFilterProp="pricings"
          deep={false}
          selectedFilterValues={selectedFilterValues}
          filterTextLength={30}
          filterHandler={filterItemsBySelfTitle}
          onCheck={(e) => handleFilterCheck(e, "pricings")}
          onReset={() => {
            if (selectedFilterValues["pricings"].length)
              setSelectedFilterValues({
                ...selectedFilterValues,
                pricings: [],
              });
          }}
        />
      </div>
    </div>
  );
};

export default FilterUtil;
