import { useState } from "react";
import clsx from "clsx";

import AppIcon from "../icons";
import Link from "next/link";

const Footer = () => {
  const [isDonateHovered] = useState(false);

  return (
    <div className="items-center justify-between w-full text-base font-normal align-row bg-body">
      <a
        href="https://sidebridge.lemonsqueezy.com/checkout/buy/f89996c5-b28b-4577-9875-564250c11893?embed=1&logo=0&discount=0&dark=1"
        className="lemonsqueezy-button"
      >
        <div
          className={clsx(
            "view-brief press align-row items-center rounded-full  text-light",
            "border border-dark leading-relaxed p-2 px-5 mr-2",
            "hover:border-accent hover:bg-dark"
          )}
        >
          <AppIcon icon="DonateAccent" name="donate" styles="mr-2 mb-1" />

          <span>Donate</span>
        </div>
      </a>

      <span className="text-white">
        Made with 💚 by the {""}
        <span className=" text-accent">Duo</span>
        {" of "}
        <b className="text-primary press">
          <i>
            <Link href="https://www.sidebridge.io/#team" target={"_blank"}>
              SideBridge.io
            </Link>
          </i>
        </b>
      </span>
    </div>
  );
};

export default Footer;
