import { useState } from "react";
import clsx from "clsx";

import AppIcon from "../icons";

const Footer = () => {
  const [isDonateHovered] = useState(false);

  return (
    <div className="w-full flex flex-row items-center justify-between font-light text-base">
      <div
        className={clsx(
          "view-brief press flex flex-row items-center rounded-full text-white text-light",
          "border-2 border-grey border-opacity-30 leading-relaxed p-2 px-5 mr-2",
          "hover:border-primary hover:bg-dark"
        )}
      >
        <AppIcon icon="DonateWhite" name="donate" styles="mr-2 mb-1" />

        <span>Donate</span>
      </div>

      <span className="text-white">
        Made with ❤️ by <span className="text-accent press">@GeekyAdams</span> &{" "}
        <span className="text-accent press">Emmanuel A.</span>
      </span>
    </div>
  );
};

export default Footer;
