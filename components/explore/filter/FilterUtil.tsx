"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import clsx from "clsx";
import { Tooltip } from "antd";

import BaseButton from "@/components/common/base/BaseButton";
import AppIcon from "@/components/common/icons";
import MultichoiceSelect from "@/components/common/util/MultichoiceSelect";

import api from "@/utils/services/axios";
import {
  filterCountryByNameAndAlphaCode,
  filterItemsByName,
  filterItemsBySelfTitle,
} from "@/utils/helper/filters";
import { supabaseClient } from "@/utils/services/supabase/client";

import { toggleModal } from "@/store/modal";

import {
  pricings,
  supportedLanguages,
  type ApiFilters,
} from "@/public/constants/filters";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

const initialFilterObject: ApiFilters = {
  countries: [],
  sectors: [],
  supportedLanguages: [],
  pricings: [],
};

const FilterUtil = ({
  isSearching,
  onFiltered,
}: {
  isSearching: boolean;
  onFiltered: (searchString?: string, filterSelections?: ApiFilters) => void;
}) => {
  const {
    data: countries,
    error,
    isLoading: isLoadingCountries,
  } = useSWR("https://restcountries.com/v2/all", fetcher);

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

  const [selectedFilterValues, setSelectedFilterValues] =
    useState<ApiFilters>(initialFilterObject);

  const [searchTerm, setSearchTerm] = useState<string>("");

  function handleFilterCheck(
    e: React.ChangeEvent<HTMLInputElement>,
    filterSection: keyof ApiFilters
  ) {
    const value = e.target.value;

    if (e.target.checked) {
      if (!selectedFilterValues[filterSection].includes(value)) {
        updateFilterState(filterSection, [
          ...selectedFilterValues[filterSection],
          value,
        ]);
      }
    } else {
      const valueIndex = selectedFilterValues[filterSection].indexOf(value);
      let valueCopy = [...selectedFilterValues[filterSection]];

      if (valueIndex !== -1) {
        valueCopy.splice(valueIndex, 1);

        updateFilterState(filterSection, valueCopy);
      }
    }
  }

  function updateFilterState(property: string, value: string[]) {
    const updatedFilterValues = {
      ...selectedFilterValues,
      [property]: value,
    };

    setSelectedFilterValues(updatedFilterValues);

    console.log(updatedFilterValues);

    localStorage.setItem("localFilters", JSON.stringify(updatedFilterValues));
  }

  function onInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSearchTerm(e.target.value);
    //handle change here
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      // handle enter effect here (search)
    }
  }

  const [visibleDropdown, setVisibleDropdown] = useState<keyof ApiFilters | "">(
    ""
  );

  function clearAppliedFilters() {
    setSelectedFilterValues(initialFilterObject);
    setVisibleDropdown("");

    localStorage.setItem("localSearchTerm", "");
    localStorage.setItem("localFilters", JSON.stringify(initialFilterObject));
  }

  useEffect(() => {
    onFiltered(searchTerm, selectedFilterValues);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilterValues]);

  useEffect(() => {
    fetchAPIServiceSectors();

    const savedFilter = localStorage.getItem("localFilters");

    setSearchTerm(() => localStorage.getItem("localSearchTerm") || "");
    setSelectedFilterValues(() =>
      savedFilter ? JSON.parse(savedFilter) : initialFilterObject
    );
  }, []);

  return (
    <div className="w-full border rounded-b-none border-dark rounded-xl">
      <div className="items-center w-full h-16 p-4 search-item align-row">
        <AppIcon icon={"Search"} />
        <input
          className={clsx(
            "bg-transparent outline-none border-none text-white py-2 text-base ml-2 flex flex-grow mx-2",
            "focus:border-none focus:outline-none placeholder:text-grey-light hover:placeholder:text-grey-label hover:placeholder:font-light"
          )}
          placeholder={
            "Search APIs by name, function, coverage, pricing and more..."
          }
          type="text"
          value={searchTerm}
          onChange={onInputChange}
          onKeyDown={handleKeyPress}
        />
        <span
          className={clsx(
            "mr-4 text-sm font-light text-light press hover:text-red-400",
            !searchTerm && "hidden"
          )}
          onClick={() => {
            setSearchTerm("");
            onFiltered("", selectedFilterValues);
            localStorage.setItem("localSearchTerm", "");
          }}
        >
          Clear
        </span>
        <BaseButton
          text={
            isSearching ? "Pooling..." : !searchTerm ? "Refresh Data" : "Search"
          }
          type="primary"
          styles="px-8 w-fit mr-4"
          loading={isSearching}
          loaderStyle="mr-2.5 w-4 h-4 absolute"
          onClick={() => {
            onFiltered(searchTerm, selectedFilterValues);
            localStorage.setItem("localSearchTerm", searchTerm);
          }}
        />
        <Tooltip title="Coming Soon ✨" placement="topLeft">
          <div
            className="mr-2 centered-row press"
            // onClick={() => toggleModal("aiSearchModal", true)}
          >
            <AppIcon icon={"MagicWand"} styles="mr-1.5" />
            <span className="font-light text-accent">Advance Search w/ AI</span>
          </div>
        </Tooltip>
      </div>

      <div className="flex-wrap items-center w-full border-t min-h-[64px] align-row filter-items border-dark">
        <MultichoiceSelect
          styles="border-r border-dark min-w-[240px]"
          allItems={countries || []}
          filterSection="Country"
          labelProp="name"
          labelPrefixProp="alpha3Code"
          selectedFilterProp="countries"
          selectedValues={selectedFilterValues["countries"]}
          filterValueProp="name"
          filterHandler={filterCountryByNameAndAlphaCode}
          activeFilter={visibleDropdown}
          onCheck={(e) => handleFilterCheck(e, "countries")}
          onReset={() => updateFilterState("countries", [])}
          onOpen={() => setVisibleDropdown("countries")}
          onClose={() => setVisibleDropdown("")}
        />

        <MultichoiceSelect
          styles="border-r border-dark min-w-[210px]"
          allItems={apiServiceDomains || []}
          filterSection="Sector"
          labelProp="name"
          selectedFilterProp="sectors"
          selectedValues={selectedFilterValues["sectors"]}
          filterValueProp="id"
          filterTextLength={30}
          filterHandler={filterItemsByName}
          activeFilter={visibleDropdown}
          onCheck={(e) => handleFilterCheck(e, "sectors")}
          onReset={() => updateFilterState("sectors", [])}
          onOpen={() => setVisibleDropdown("sectors")}
          onClose={() => setVisibleDropdown("")}
        />

        <MultichoiceSelect
          styles="border-r border-dark min-w-[256px] flex-grow"
          allItems={supportedLanguages || []}
          filterSection="Supported SDK Languages"
          selectedFilterProp="supportedLanguages"
          deep={false}
          selectedValues={selectedFilterValues["supportedLanguages"]}
          filterTextLength={30}
          filterHandler={filterItemsBySelfTitle}
          activeFilter={visibleDropdown}
          onCheck={(e) => handleFilterCheck(e, "supportedLanguages")}
          onReset={() => updateFilterState("supportedLanguages", [])}
          onOpen={() => setVisibleDropdown("supportedLanguages")}
          onClose={() => setVisibleDropdown("")}
        />

        <MultichoiceSelect
          styles="border-r border-dark min-w-[200px]"
          allItems={pricings}
          filterSection="Pricing"
          selectedFilterProp="pricings"
          deep={false}
          selectedValues={selectedFilterValues["pricings"]}
          filterTextLength={30}
          filterHandler={filterItemsBySelfTitle}
          showSearch={false}
          activeFilter={visibleDropdown}
          onCheck={(e) => handleFilterCheck(e, "pricings")}
          onReset={() => updateFilterState("pricings", [])}
          onOpen={() => setVisibleDropdown("pricings")}
          onClose={() => setVisibleDropdown("")}
        />

        <div className="w-48 h-full px-5 centered-col">
          <BaseButton
            text="&#9249; Reset Filters"
            type="default"
            styles="px-4 border border-grey-border text-grey-label hover:text-red-400 hover:border-red-400 py-2"
            onClick={clearAppliedFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterUtil;
