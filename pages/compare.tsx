import clsx from "clsx";
import { NextPage } from "next";
import { useState } from "react";

import MainLayout from "@/components/layout/MainLayout";
import CompareItem from "@/components/compare/CompareItem";

import classes from "@/styles/compare.module.css";
import AppIcon from "@/components/common/icons";

const Compare: NextPage = () => {
  return (
    <MainLayout>
      <div className="items-center w-full px-24 align-col">
        <div className="w-full py-16 text-center explore-header centered-col">
          <h1 className="text-5xl font-bold text-light">Compare API</h1>
          <p className="mt-6 text-xl font-light text-grey">
            Quickly compare from thousands of APIs and third-party services and
            <br />
            easily make technical choices for your next project.
            <br />
            Note that you can only compare services from the same business
            domain
          </p>
        </div>

        <section className="w-full mb-32 border rounded-2xl align-row bg-dark-matte border-grey-faint">
          <div className="w-4/12 h-full overflow-hidden align-col border-grey-faint rounded-2xl">
            <div className="items-center h-20 px-12 font-light border-b row-btwn text-light border-grey border-opacity-10">
              <span className="">Features</span>
            </div>

            <div className="h-auto p-6 px-12 text-white align-col">
              <div className={classes["compare-title"]}>
                <AppIcon
                  name="Available Date"
                  icon="CalendarGreen"
                  styles="w-5"
                />
                <span>Available Since</span>
              </div>
              <div className={classes["compare-title"]}>
                <AppIcon name="Users" icon="UsersGreen" styles="w-5" />
                <span>Number of Users</span>
              </div>
              <div className={clsx("h-40 w-full mb-4")}>
                <div className={clsx(classes["compare-title"], "mb-0")}>
                  <AppIcon name="Pricing" icon="DollarGreen" styles="w-5" />
                  <span>Pricing</span>
                </div>
              </div>
              <div className={classes["compare-title"]}>
                <AppIcon
                  name="Language Support"
                  icon="CodeGreen"
                  styles="w-5"
                />
                <span>Supported Language</span>
              </div>
              <div className={classes["compare-title"]}>
                <AppIcon
                  name="Availability"
                  icon="EventAvailableGreen"
                  styles="w-5"
                />
                <span>Availability</span>
              </div>
            </div>
          </div>

          <CompareItem styles="border-x border-grey-faint rounded-t-2xl" />

          <CompareItem />
        </section>
      </div>
    </MainLayout>
  );
};

export default Compare;

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/explore",
      permanent: false,
    },
  };
};
