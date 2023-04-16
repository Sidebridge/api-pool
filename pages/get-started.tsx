import Image from "next/image";
import { NextPage } from "next";
import Link from "next/link";

import appPreview from "../assets/images/illustrations/app_view.png";
import AppLogo from "../assets/images/logo/favicon.png";
import BasePill from "@/components/common/base/BasePill";

import AuthIntegrations from "@/public/constants/integrations";
import Icons from "@/components/common/icons/iconMap";

const Register: NextPage = () => {
  return (
    <div className="w-screen h-screen align-row">
      <div className="w-1/2 h-full centered-col relatve">
        <Link href="/">
          <Image
            src={AppLogo}
            alt="Api Pool Logo"
            className="absolute top-16 left-20"
          />
        </Link>

        <div className="w-9/12 align-col h-fit">
          <h2 className="text-3xl text-white">Get Started</h2>

          <p className="mt-2 text-grey">
            Sign up with your Google, Github or Apple account
          </p>

          <div className="w-full mt-6 centered-col">
            {AuthIntegrations.map((integration) => (
              <BasePill
                key={integration.name}
                text={`Sign up with ${integration.name}`}
                preIcon={integration.icon as keyof typeof Icons}
                styles="w-full mb-4 press border-2"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/2 illustration bg-primary rounded-l-3xl centered-row">
        <Image src={appPreview} alt="app preview" />
      </div>
    </div>
  );
};

export default Register;
