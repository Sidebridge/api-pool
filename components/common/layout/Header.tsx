import { clsx } from "clsx";

import Link from "next/link";

import { Button } from "antd";
import AppLogo from "../base/AppLogo";
import ProfilePreview from "../util/ProfilePreview";

import { toggleModal } from "@/store/modal";
import { useAuth } from "@/store/context/AuthProvider";
import BaseButton from "../base/BaseButton";

function Header() {
  const { auth } = useAuth();

  return (
    <div
      className={clsx(
        "sticky top-0 align-row py-4 px-24 bg-body  justify-between items-center",
        "border-b border-grey-legacy border-opacity-10"
      )}
      style={{ zIndex: 90 }}
    >
      <Link href="/">
        <AppLogo />
      </Link>

      <div className="items-center align-row">
        {auth && <ProfilePreview />}

        {!auth && (
          <BaseButton
            text="Login"
            type="primary"
            styles="h-12 px-8"
            // onClick={() => toggleModal("loginModal", true)}
          />
        )}
      </div>
    </div>
  );
}

export default Header;
