import { useState } from "react";
import clsx from "clsx";

import AppIcon from "../icons";
import Link from "next/link";

const Footer = () => {
  const [isDonateHovered] = useState(false);

  return (
    <div className="items-center w-full text-base font-normal row-btwn bg-body">
      <a href="" className="">
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

      <a href="https://github.com/Sidebridge/api-pool" target="_blank">
        <div className="centered-row text-light press">
          <AppIcon icon={"GithubWhite"} styles="mr-2 w-5" />
          <span>Github</span>
        </div>
      </a>

      <span className="text-light">
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
