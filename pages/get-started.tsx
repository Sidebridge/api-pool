import Image from "next/image";
import { NextPage } from "next";
import Link from "next/link";

import appPreview from "../assets/images/illustrations/app_view.png";
import AppLogo from "../assets/images/logo/favicon.png";
import BasePill from "@/components/common/base/BasePill";

import AuthIntegrations from "@/public/constants/integrations";

const Register: NextPage = () => {
  return (
    <div className="h-screen w-screen align-row">
      <div className="w-1/2 h-full centered-col relatve">
        <Link href="/">
          <Image
            src={AppLogo}
            alt="Api Pool Logo"
            className="absolute top-16 left-20"
          />
        </Link>

        <div className="align-col w-9/12 h-fit">
          <h2 className="text-3xl text-white">Get Started</h2>

          <p className="text-grey mt-2">
            Sign up with your Google, Github or Apple account
          </p>

          <div className="centered-col w-full mt-6">
            {AuthIntegrations.map((integration) => (
              <BasePill
                key={integration.name}
                text={`Sign up with ${integration.name}`}
                preIcon={integration.icon}
                styles="w-full mb-4 press border-2"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="illustration w-1/2 bg-primary rounded-l-3xl centered-row">
        <Image src={appPreview} alt="app preview" />
      </div>
    </div>
  );
};

export default Register;
