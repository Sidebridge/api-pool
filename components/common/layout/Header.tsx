import { clsx } from "clsx";

import Link from "next/link";

import { Button } from "antd";
import AppLogo from "../base/AppLogo";
import ProfilePreview from "../util/ProfilePreview";

import { toggleModal } from "@/store/modal";
import { useAuth } from "@/store/context/AuthProvider";

function Header() {
  const { auth } = useAuth();

  return (
    <div
      className={clsx(
        "align-row py-4 px-24 bg-dark justify-between items-center",
        ""
      )}
    >
      <Link href="/">
        <AppLogo />
      </Link>

      <div className="items-center align-row">
        {auth && <ProfilePreview />}

        {!auth && (
          <Button
            className={clsx("bg-primary text-dark text-lg leading-relaxed", "")}
            type="ghost"
            shape="round"
            icon=""
            size="large"
            onClick={() => toggleModal("loginModal", true)}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
