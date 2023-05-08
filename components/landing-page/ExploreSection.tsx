import { useState } from "react";
import clsx from "clsx";

import classes from "@/styles/landing-page.module.css";

import { Button } from "antd";
import AppIcon from "../common/icons";
import CustomInput from "../common/util/CustomButtonedInput";
import ApiCard from "../common/util/ApiCard";

import type { ApiService } from "@/types/api-service.type";
import { useRouter } from "next/router";
import BaseButton from "../common/base/BaseButton";

const Explore = ({
  services,
  cardSize,
  tag,
  title,
  subtitle,
}: {
  services: null | ApiService[];
  cardSize?: string;
  tag?: string;
  title: string;
  subtitle?: string;
}) => {
  const router = useRouter();

  return (
    <section
      id="explore-section"
      className={clsx("align-col w-full items-center pt-10 px-24 pb-10")}
    >
      {tag && (
        <div className="px-10 py-3 mb-4 font-normal text-center border rounded-full featured-pill bg-dark-matte-new text-grey-legacy border-dark">
          <span>{tag}</span>
        </div>
      )}

      <div className="items-center w-full text-center header-text align-col">
        <h2
          className={clsx("text-5xl font-medium", classes["header-text__bg"])}
        >
          {title}
        </h2>
        <p className="w-5/12 mt-4 text-lg font-normal capitalize text-grey-legacy">
          {subtitle}
        </p>
      </div>

      <div className="grid w-full grid-flow-row grid-cols-3 mt-16 featured-list gap-y-8 gap-x-5">
        {services?.map((service) => (
          <div
            className="h-fit press"
            // style={{ width: cardSize }}
            key={service?.service_id}
          >
            <ApiCard service={service} />
          </div>
        ))}
      </div>

      {(!services || services.length === 0) && (
        <div className="items-center p-10 mt-2 mb-6 border align-col border-grey-border rounded-2xl">
          <AppIcon
            name="error-illustration"
            icon="ErrorBroken"
            styles="w-72 mb-10"
          />
          <span className="text-xl font-light text-grey">
            No data available for display
          </span>
        </div>
      )}

      <BaseButton
        text={
          !services || services.length === 0
            ? "Go to explore page"
            : "Explore More APIs"
        }
        type="primary"
        styles="px-8 bg-primary text-lg mt-12 h-14"
        onClick={() => router.push("/explore")}
      />
    </section>
  );
};

export default Explore;
