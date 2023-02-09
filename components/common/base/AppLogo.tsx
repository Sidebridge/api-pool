import clsx from "clsx";
import Image from "next/image";

import appLogo from "../../../assets/images/logo/app-logo.png";

const AppLogo = () => {
  return (
    <Image
      className={clsx()}
      src={appLogo}
      width="120"
      height="30"
      alt="APIPool Logo"
    />
  );
};

export default AppLogo;
