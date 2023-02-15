import { useState } from "react";
import clsx from "clsx";

import { Button } from "antd";
import AppIcon from "../common/icons";
import SearchInput from "../common/util/SearchInput";
import ApiCard from "../common/util/ApiCard";

const domains = [
  { id: 1, name: "e-commerce", icon: "Ecommerce" },
  { id: 2, name: "sport", icon: "Sport" },
  { id: 3, name: "movies", icon: "Movie" },
  { id: 4, name: "logistics", icon: "Logistic" },
  { id: 5, name: "finance", icon: "Ecommerce" },
];

const Explore = () => {
  const [selectedDomain, setSelectedDomain] = useState<number | null>(null);

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  function domainSelectHandler(id: number | null) {
    setSelectedDomain(id);
  }

  function cardHoverHandler(card: number | null) {
    setHoveredCard(card);
  }

  return (
    <section
      id="explore-section"
      className={clsx(
        "align-col w-full justify-between items-center pt-28 px-24 pb-10"
      )}
    >
      <div className="w-full align-row items-center justify-between">
        <div className="align-col w-6/12">
          <h2
            className="w-10/12 font-bold mb-6 text-white text-5xl"
            style={{ lineHeight: "67px" }}
          >
            Explore APIs
          </h2>

          <p className="w-11/12 text-grey font-light text-xl">
            Quickly find the right API. Filter by category, company, function.
            Detailed info, code, reviews. Latest offerings from top companies.
            Search now!
          </p>
        </div>

        <div className="align-col w-4/12">
          <SearchInput />

          <div className="w-full align-row flex-wrap gap-x-4 justify-between content-start items-center mt-5">
            {domains.map((domain) => (
              <div
                key={domain.id}
                className={clsx(
                  "p-3 px-4 mb-4 text-base press capitalize border border-grey rounded-full",
                  "flex-grow align-row center",
                  selectedDomain !== domain.id &&
                    "hover:border-primary hover:border-opacity-60",
                  selectedDomain === domain.id && "border-primary"
                )}
                onClick={() => domainSelectHandler(domain.id)}
              >
                <AppIcon styles="mr-3" icon={domain.icon} name={domain.name} />
                <span className="text-grey">{domain.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="featured-list w-full align-row flex-wrap justify-between gap-x-1 content-start mt-12">
        {[1, 2, 3, 4, 5, 6].map((card) => (
          <div
            className="h-fit mb-12 press"
            style={{ width: "31%" }}
            key={card}
            onMouseEnter={() => cardHoverHandler(card)}
            onMouseLeave={() => cardHoverHandler(null)}
          >
            <ApiCard isHovered={hoveredCard === card} />
          </div>
        ))}
      </div>

      <Button
        className={clsx(
          "text-dark align-row items-center bg-primary ml-6 h-12 p-4 px-12 text-xl press mt-6",
          ""
        )}
        type="ghost"
        shape="round"
      >
        <span className="mr-2 text-lg">See More APIs</span>

        <AppIcon name="arrow" icon="ArrowRightBlack" />
      </Button>
    </section>
  );
};

export default Explore;
