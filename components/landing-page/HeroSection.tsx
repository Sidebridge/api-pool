import clsx from "clsx";
import Image from "next/image";

import { Button } from "antd";

import heroImage from "../../assets/images/illustrations/hero-image.png";

const Hero = () => {
  return (
    <section
      id="hero-section"
      className={clsx(
        "flex flex-row w-full justify-between items-center py-20 px-24"
      )}
    >
      <div className={clsx("flex flex-col w-6/12 ")}>
        <h1
          className="w-10/12 font-bold mb-8 text-white text-6xl"
          style={{ lineHeight: "67px" }}
        >
          Find the right API to bring your next idea to life
        </h1>
        <p className="w-11/12 text-grey text-2xl">
          Access a wide range of APIs & third-party services for every use case
          in one convenient place. Easy comparison, quick decisions.
        </p>

        <div className="flex flex-row items-center mt-12">
          <Button
            className={clsx(
              "bg-primary text-dark border-none h-12 w-44 text-lg press",
              ""
            )}
            shape="round"
            type="ghost"
            icon=""
          >
            Explore APIs
          </Button>

          <Button
            className={clsx(
              "text-white bg-transparent border border-white ml-6 h-12 w-36 text-lg press",
              ""
            )}
            type="ghost"
            shape="round"
          >
            <span>List API</span>
          </Button>
        </div>
      </div>

      <Image
        className={clsx()}
        src={heroImage}
        width="650"
        height="480"
        alt="APIPool Logo"
        priority
      />
    </section>
  );
};

export default Hero;
