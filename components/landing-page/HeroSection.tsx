import clsx from "clsx";
import Image from "next/image";

import { Button } from "antd";

import heroImage from "../../assets/images/illustrations/dashboard.png";
import AppIcon from "../common/icons";
import { useRouter } from "next/router";
import { toggleModal } from "@/store/modal";

import classes from "@/styles/landing-page.module.css";

const Hero = () => {
  const router = useRouter();

  return (
    <section
      id="hero-section"
      className={clsx(
        "align-col w-full justify-between items-center py-20 px-24",
        classes["hero-bg"]
      )}
    >
      <div className={clsx("align-col items-center w-10/12 text-center")}>
        <h1
          className="w-10/12 mb-8 text-6xl font-bold text-white"
          style={{ lineHeight: "67px" }}
        >
          Find the right API to bring your next idea to life
        </h1>
        <p className="w-11/12 text-2xl font-light text-grey">
          Access a wide range of APIs & third-party services for every use case
          in one convenient place. Easy comparison, quick decisions.
        </p>

        <div className="items-center mt-12 align-row">
          <Button
            className={clsx(
              "bg-primary text-dark border-none h-12 w-44 text-lg press",
              ""
            )}
            shape="round"
            type="ghost"
            icon=""
            onClick={() => router.push("/explore")}
          >
            Explore APIs
          </Button>

          <Button
            className={clsx(
              "text-white bg-transparent border border-white ml-6 h-12 w-36 text-lg press",
              "align-row center"
            )}
            type="ghost"
            shape="round"
            onClick={() => toggleModal("apiRecommendationModal", true)}
          >
            <span>List API</span>
            <AppIcon icon="ArrowRightWhite" name="arrow" styles="ml-2.5" />
          </Button>
        </div>
      </div>

      <Image
        className={clsx("mt-20 w-10/12")}
        src={heroImage}
        height="480"
        alt="APIPool Logo"
        priority
      />
    </section>
  );
};

export default Hero;
