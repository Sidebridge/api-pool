/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { Tooltip } from "antd";
import { useRouter } from "next/router";

import classes from "@/styles/api-card.module.css";

import FeaturedTag from "./FeaturedTag";
import BaseButton from "../base/BaseButton";
import SupportedSDKs from "./SupportedSDKLangs";
import AppIcon from "../icons";

import { setCurrentApi } from "@/store/api-services";

import type { ApiService } from "@/types/api-service.interface";
import { MouseEventHandler, useState } from "react";

type CardProp = {
  isHovered?: boolean;
  service: ApiService;
  type?: "small" | "medium" | "large";
  styles?: string;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
};

const ApiCard = ({
  isHovered = false,
  service,
  type = "large",
  styles,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}: CardProp) => {
  const router = useRouter();

  const [loadApiDetail, setApiDetailLoad] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        "w-full cursor-default overflow-hidden rounded-2xl box-border h-full text-light",
        isHovered
          ? classes["card-border__hovered"]
          : classes["card-border__bg"],
        loadApiDetail && "opacity-25"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={clsx(
          "w-full card-inner__bg overflow-y-hidden relative h-full align-col rounded-2xl overflow-x-hidden",
          styles
        )}
      >
        <div
          className={clsx("w-full h-16 bg-cover", classes["header__bg"])}
        ></div>
        <div className="w-full px-6">
          <div className="w-full mx-auto -mt-10 row-btwn">
            <div className="p-3 border rounded-lg service-logo bg-body border-dark centered_col">
              <img
                className={clsx("w-8 h-8")}
                src={service.logo}
                alt={`${service.service_name} Logo`}
              />
            </div>

            {service.is_featured && <FeaturedTag />}
          </div>

          <div className="mt-6 align-col">
            <h1 className="text-lg font-bold text-grey-lighter">
              {service.service_name}
            </h1>
            <span className="text-xs text-accent">
              → {service.business_sector_name || "Unknown Sector"}
            </span>
          </div>

          <p className="my-4 text-sm font-light text-grey-lighter">
            {service.service_description.substring(0, 120)}
            {service.service_description.length > 120 && (
              <>
                {"... "}
                <span className="text-accent press">Read More</span>
              </>
            )}
          </p>

          <SupportedSDKs
            langs={service.supported_languages}
            styles="mb-4 text-sm"
          />
        </div>

        <div
          className={clsx(
            "absolute px-6 bottom-0  left-0 w-full rounded-b-2xl transition-height duration-300 ease-in-out",
            isHovered && classes["card__overlay"],
            isHovered ? "h-52" : "h-0"
          )}
        >
          <div className="items-center justify-center w-full mx-auto mt-28 align-row">
            <BaseButton
              text="See Details"
              type="default"
              icon="BriefWhite"
              styles="h-12 mr-2 text-light px-8 bg-body border border-grey-border hover:border-primary hover:border-opacity-40"
              onClick={() => {
                setApiDetailLoad(true);
                router.push(`/api-service/${service.service_id}`);
              }}
            />

            <Tooltip title="Compare API" placement="topRight">
              <div className="bg-primary press rounded-full p-2.5 px-3">
                <AppIcon icon="CompareDark" name="compare" />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiCard;
