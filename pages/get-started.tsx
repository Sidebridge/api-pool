import clsx from "clsx";
import Image from "next/image";
import { NextPage } from "next";

import appPreview from "../assets/images/illustrations/app_view.png";
import Pill from "@/components/common/base/BasePill";

const SignupIntegrations = [
  { name: "Google", icon: "GoogleLogo" },
  { name: "Github", icon: "GithubWhite" },
  { name: "Apple", icon: "AppleLogo" },
];

const Register: NextPage = () => {
  return (
    <div className="h-screen w-screen align-row">
      <div className="w-1/2 h-full centered-col">
        <div className="align-col w-10/12 h-fit">
          <h2 className="text-3xl text-white">Get Started</h2>

          <p className="text-grey mt-2">
            Sign up with your Google, Github or Apple account
          </p>

          <div className="centered-col w-full mt-6">
            {SignupIntegrations.map((integration) => (
              <Pill
                key={integration.name}
                text={`Sign up with ${integration.name}`}
                preIcon={integration.icon}
                styles="w-full mb-4 press"
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
