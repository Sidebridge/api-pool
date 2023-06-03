import clsx from "clsx";
import Image from "next/image";

import { Button } from "antd";

import heroImage from "../../assets/images/illustrations/dashboard-snapshot.svg";

import shortBar from "../../assets/images/svg/blurred_bar_short.svg";
import mediumBar from "../../assets/images/svg/blurred_bar_medium.svg";
import longBar from "../../assets/images/svg/blurred_bar_long.svg";

import AppIcon from "../common/icons";
import { useRouter } from "next/router";
import { toggleModal } from "@/store/modal";

import classes from "@/styles/landing-page.module.css";
import BaseButton from "../common/base/BaseButton";

const Hero = () => {
  const router = useRouter();

  return (
    <section
      id="hero-section"
      className={clsx(
        "align-col w-full justify-between items-center pb-14 pt-28 px-24",
        classes["hero__bg"]
      )}
    >
      <div className="relative w-11/12 -top-16">
        <Image
          className={clsx("absolute left-0 animate-move-3s")}
          src={longBar}
          alt=""
        />
      </div>

      <div className={clsx("align-col items-center w-10/12 text-center")}>
        <span className="mb-12  text-grey-label">
          Use
          <span className="p-4 py-3 mx-3 text-white press glass-bg">
            {" "}
            Cmd(⌘) + F{" "}
          </span>
          for quick find
        </span>
        <h1
          className={clsx(
            "w-10/12 mb-8 text-5xl font-semibold text-white break-keep",
            classes["header-text__bg"]
          )}
          style={{ lineHeight: "58px" }}
        >
          Discover The Right API Products w/ APIPOOL <wbr />፡ Your Ultimate
          Developer Peephole ✨
        </h1>
        <p className="w-9/12 text-lg font-normal capitalize text-grey-legacy">
          Landing the perfect API integrations shouldn&apos;t cause you sweat 💧
          <br />
          APIPOOL Is The Ultimate Search Engine for API Products/Services With
          Advanced Features - Explore, Compare, Review and Connect to APIs that
          work like a charm
        </p>

        <div className="items-center mb-10 mt-14 align-row">
          <div className="items-center font-normal align-row animate-bounce-3s">
            <AppIcon name="Explore" icon="ExploreGreen" styles="mr-5 w-6 h-6" />
            <span className="text-lg text-light">Explore</span>
          </div>

          <div className="items-center mx-10 font-normal align-row animate-bounce-6s">
            <AppIcon name="Compare" icon="CompareGreen" styles="mr-5 w-6 h-6" />
            <span className="text-lg text-light">Compare</span>
          </div>

          <div className="items-center font-normal align-row animate-bounce-9s">
            <AppIcon
              name="Integrate"
              icon="IntegrateGreen"
              styles="mr-5 w-6 h-6"
            />
            <span className="text-lg text-light">Integrate</span>
          </div>
        </div>

        <div className="items-center mt-4 align-row">
          <BaseButton
            text="Explore APIs"
            type="primary"
            styles="h-12 mr-4 px-8"
            onClick={() => router.push("/explore")}
          />

          <BaseButton
            text="List API"
            type="secondary"
            styles="h-12 px-8 hover:text-dark"
            onClick={() => toggleModal("apiRecommendationModal", true)}
          />
        </div>
      </div>

      <div className="relative w-11/12 mt-12">
        <Image
          className={clsx("mt-10 absolute left-0  animate-move")}
          src={shortBar}
          alt=""
        />
        <Image
          className={clsx("absolute right-64 animate-move-2s")}
          src={mediumBar}
          alt=""
        />
      </div>

      <Image
        className={clsx("mt-10 w-11/12 hover-animate-pulse-rotate")}
        src={heroImage}
        height="480"
        alt="APIPool Logo"
        priority
      />
    </section>
  );
};

export default Hero;
