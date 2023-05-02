import { useEffect, useState } from "react";
import clsx from "clsx";
import { Tooltip } from "antd";

import AppIcon from "../icons";
import FilterItem from "@/components/explore/filter/FilterItem";

import { ApiFilters } from "@/public/constants/filters";
import { toCapitalizedString } from "@/utils/helper/converter";

type MultichoiceSelectProps = {
  allItems: any[];
  filterSection: string;
  labelProp?: string;
  labelPrefixProp?: string;
  selectedFilterProp: keyof ApiFilters;
  deep?: boolean;
  iconProp?: string;
  selectedValues: string[];
  filterTextLength?: number;
  filterValueProp?: string;
  filterHandler: Function;
  styles?: string;
  showSearch?: boolean;
  activeFilter?: keyof ApiFilters | "";
  onOpen: () => void;
  onClose: () => void;
  onCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
};

const MultichoiceSelect = ({
  allItems,
  filterSection,
  labelProp = "",
  labelPrefixProp = "",
  selectedFilterProp,
  deep = true,
  iconProp = "",
  selectedValues,
  filterTextLength = 12,
  filterValueProp = "",
  filterHandler,
  styles,
  showSearch = true,
  activeFilter,
  onOpen,
  onClose,
  onCheck,
  onReset,
}: MultichoiceSelectProps) => {
  const [filterSearchTerm, setFilterSearchTerm] = useState<string>("");

  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  // const [isShowingFilterDropdown, setFilterDropdownState] =
  //   useState<boolean>(false);

  useEffect(() => {
    const matchingItems = filterHandler(allItems, filterSearchTerm);

    setFilteredItems(matchingItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allItems, filterSearchTerm]);

  return (
    <div
      className={clsx(
        "relative flex justify-center h-full overflow-x-clip",
        styles
      )}
    >
      {selectedValues.length ? (
        <div className="box-border items-center w-full h-full p-4 have-selections row-btwn">
          <div
            className="items-center mr-2 align-row press"
            onClick={() =>
              activeFilter === selectedFilterProp ? onClose() : onOpen()
            }
          >
            <span className="p-2.5 py-1.5 text-center mr-2 border rounded-full text-grey-label border-dark">
              {selectedValues.length}+
            </span>
            <span className="capitalize text-light">
              {toCapitalizedString(selectedFilterProp)}
            </span>
          </div>

          <Tooltip title="Clear selected options 🗑️" placement="left">
            <AppIcon icon={"CloseGreen"} styles="press" onClick={onReset} />
          </Tooltip>
        </div>
      ) : (
        <div
          className="box-border items-center w-full h-full p-4 have-selections row-btwn press"
          onClick={() =>
            activeFilter === selectedFilterProp ? onClose() : onOpen()
          }
        >
          <span className="capitalize text-grey-label">{filterSection}</span>

          <AppIcon icon={"ArrowDownGreen"} />
        </div>
      )}

      <div
        className={clsx(
          "absolute px-2 py-3 min-w-full border rounded-b-[8px] border-dark top-14 z-[200] bg-body mt-1 dropdown-shadow",
          activeFilter !== selectedFilterProp && "hidden"
        )}
      >
        <p
          className={clsx(
            "ml-auto text-sm w-fit text-primary press",
            !selectedValues.length && "hidden"
          )}
          onClick={onReset}
        >
          Clear
        </p>

        {showSearch && (
          <input
            type="search"
            className={clsx(
              "w-full h-10 bg-transparent text-light py-3 box-border border border-grey border-opacity-10 rounded-lg mt-2 px-3",
              "focus:outline-none  placeholder:text-sm placeholder:text-grey-label placeholder:font-light"
            )}
            placeholder={`Search ${selectedFilterProp}`}
            onChange={(e) => setFilterSearchTerm(e.target.value)}
          />
        )}

        <div className="w-full mt-2.5 overflow-y-scroll px-2 max-h-96">
          {filteredItems.map((item: { [key: string]: string | any }, index) => (
            <FilterItem
              key={`${filterSection}-filter-item-${index}`}
              styles="mb-10"
              label={
                labelProp
                  ? `${
                      labelPrefixProp ? `(${item[labelPrefixProp]}) ` : ""
                    }${String(item[labelProp]).substring(0, filterTextLength)}${
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
                  ? selectedValues.includes(String(item[filterValueProp]))
                  : selectedValues.includes(String(item).toLowerCase())
              }
              onCheck={(e) => onCheck(e)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultichoiceSelect;
