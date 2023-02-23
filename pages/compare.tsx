import clsx from "clsx";
import { NextPage } from "next";
import { useState } from "react";

import ExploreFilters from "@/public/constants/filters";

import MainLayout from "@/components/layout/MainLayout";
import { Button } from "antd";
import FilterList from "@/components/common/util/FilterList";
import SearchInput from "@/components/common/util/SearchInput";
import ApiCard from "@/components/common/util/ApiCard";

const Compare: NextPage = () => {
  const hey = (val: unknown) => {
    console.log(val);
  };

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  function cardHoverHandler(card: number | null) {
    setHoveredCard(card);
  }

  return (
    <MainLayout>
      <div className="w-full align-col items-center px-24">
        <div className="explore-header centered-col w-full py-16 text-center">
          <h1 className="text-5xl text-light font-bold">Compare API</h1>
          <p className="text-grey mt-6 text-xl font-light">
            Quickly compare from thousands of APIs and third-party services and
            <br />
            easily make technical choices for your next project.
            <br />
            Note that you can only compare services from the same business
            domain
          </p>
        </div>

        <section className="w-full h-96 align-row bg-dark-matte mb-32">
          <div className="w-4/12 h-full align-col border border-grey-faint rounded-br-none rounded-2xl">
            <div className="row-btwn items-center h-20 px-6 text-light font-light border-b border-grey border-opacity-10">
              <span className="">Features</span>
            </div>
          </div>

          <div className="w-4/12 h-full align-col border-l-0 border border-grey-faint rounded-t-2xl"></div>

          <div className="w-4/12 h-full align-col border border-l-0 border-grey-faint rounded-2xl rounded-bl-none"></div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Compare;
