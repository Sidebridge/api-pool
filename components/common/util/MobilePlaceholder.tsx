import clsx from "clsx";
import AppLogo from "../base/AppLogo";
import AppIcon from "../icons";

import classes from "@/styles/landing-page.module.css";
import { useEffect } from "react";

const MobilePlaceholder = () => {
  return (
    <div className="align-col text-center items-center sm:hidden py-8 px-5 fixed top-0 left-0 w-screen h-screen overflow-hidden bg-body z-[3000]">
      <AppLogo />

      <AppIcon icon="MobileSoon" styles="mt-3 min-w-[300px]" />

      <h1 className={clsx("text-3xl mt-8", classes["header-text__bg"])}>
        Mobile Availability Not Ready Yet!
      </h1>
      <p className="mt-6 text-lg font-light text-grey-legacy">
        We are not convinced enough yet on why we should spend some time to work
        on this app&apos;s mobile responsiveness 😬, but i assure you that the
        team is not relenting. <br />
        In the meantime, you can continue to explore APIs and have fun doing
        that on devices with larger screens like a tablet or PC 💻
      </p>
    </div>
  );
};

export default MobilePlaceholder;
