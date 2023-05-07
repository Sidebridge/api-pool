import { useState } from "react";
import clsx from "clsx";

import AppIcon from "../icons";
import Link from "next/link";

const Footer = () => {
  const [isDonateHovered] = useState(false);

  return (
    <div className="items-center justify-between w-full text-base font-normal align-row bg-body">
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

      <span className="text-white">
        Made with 💚 by{" "}
        <span className="font-light text-accent">
          <Link href="https://twitter.com/GeekyAdams" target="_blank">
            @GeekyAdams
          </Link>{" "}
          <span className="font-normal text-light">&</span>{" "}
          <Link href="https://twitter.com/emmah_ux" target="_blank">
            Emmanuel A.
          </Link>
        </span>
        {" of "}
        <b className="text-primary press">
          <i>
            <Link href="https://sidebridge.io" target={"_blank"}>
              SideBridge
            </Link>
          </i>
        </b>
      </span>
    </div>
  );
};

export default Footer;
