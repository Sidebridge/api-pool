import { useState } from "react";
import clsx from "clsx";

import { Button } from "antd";
import AppIcon from "../common/icons";
import CustomInput from "../common/util/CustomButtonedInput";
import ApiCard from "../common/util/ApiCardLegacy";

import type { ApiService } from "@/types/api-service.interface";
import { useRouter } from "next/router";

const domains = [
  { id: 1, name: "e-commerce", icon: "Ecommerce" },
  { id: 2, name: "sport", icon: "Sport" },
  { id: 3, name: "movies", icon: "Movie" },
  { id: 4, name: "logistics", icon: "Logistic" },
  { id: 5, name: "finance", icon: "Ecommerce" },
];

const Explore = ({ services }: { services: null | ApiService[] }) => {
  const router = useRouter();

  const [selectedDomain, setSelectedDomain] = useState<number | null>(null);

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  function domainSelectHandler(id: number | null) {
    setSelectedDomain(id);
  }

  function cardHoverHandler(card: string | null) {
    setHoveredCard(card);
  }

  return (
    <section
      id="explore-section"
      className={clsx(
        "align-col w-full justify-between items-center pt-28 px-24 pb-10"
      )}
    >
      <div className="items-center justify-between w-full align-row">
        <div className="w-6/12 align-col">
          <h2
            className="w-10/12 mb-6 text-5xl font-bold text-white"
            style={{ lineHeight: "67px" }}
          >
            Explore APIs
          </h2>

          <p className="w-11/12 text-xl font-light text-grey">
            Quickly find the right API. Filter by category, company, function.
            Detailed info, code, reviews. Latest offerings from top companies.
            Search now!
          </p>
        </div>

        <div className="w-4/12 align-col">
          <CustomInput
            placeholder="Search for API services conveniently"
            btnText="Search"
            processing={false}
            icon="Search"
            onEnter={() => {}}
            onClick={() => {}}
            onChange={() => {}}
          />

          <div className="flex-wrap items-center content-start justify-between w-full mt-5 align-row gap-x-4">
            {domains.map((domain) => (
              <div
                key={domain.id}
                className={clsx(
                  "p-3 px-4 mb-4 text-base press capitalize border border-grey-legacy rounded-full",
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

      <div className="flex-wrap content-start justify-between w-full mt-12 featured-list align-row gap-x-1">
        {services?.map((service) => (
          <div
            className="mb-12 h-fit press"
            style={{ flexBasis: "400px" }}
            key={service?.service_id}
            onMouseEnter={() => cardHoverHandler(service?.service_id)}
            onMouseLeave={() => cardHoverHandler(null)}
          >
            <ApiCard
              isHovered={hoveredCard === service?.service_id}
              service={service}
            />
          </div>
        ))}
      </div>

      {(!services || services.length === 0) && (
        <div className="items-center mt-12 mb-20 align-col">
          <AppIcon
            name="error-illustration"
            icon="ErrorBroken"
            styles="w-72 mb-10"
          />
          <span className="text-xl text-grey">
            No data available for display
          </span>
        </div>
      )}

      <Button
        className={clsx(
          "text-dark align-row items-center bg-primary ml-6 h-12 p-4 px-12 text-xl press mt-6",
          ""
        )}
        type="ghost"
        shape="round"
        onClick={() => router.push("/explore")}
      >
        <span className="mr-2 text-lg">See More APIs</span>

        <AppIcon name="arrow" icon="ArrowRightBlack" />
      </Button>
    </section>
  );
};

export default Explore;
