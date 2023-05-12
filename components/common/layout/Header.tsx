import { clsx } from "clsx";

import Link from "next/link";

import { Button } from "antd";
import AppLogo from "../base/AppLogo";
import ProfilePreview from "../util/ProfilePreview";
import BaseButton from "../base/BaseButton";

import { toggleModal } from "@/store/modal";

// import { useAuth } from "@/store/context/AuthProvider";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

function Header() {
  const navItems = [
    { title: "Explore", route: "/explore" },
    { title: "Compare APIs", route: "/compare" },
    { title: "Donate", route: "", target: "" },
  ];

  // const { auth } = useAuth();
  const user = useUser();

  return (
    <div className="">
      <div className="z-[50] sticky top-0 w-full p-4 notice-banner bg-accent centered-col">
        <p>This platform is still a work in progress ⚙️</p>
      </div>

      <div
        className={clsx(
          "align-row py-4 px-24 bg-body items-center",
          "border-b border-grey-legacy border-opacity-10"
        )}
        style={{ zIndex: 90 }}
      >
        <Link href="/">
          <AppLogo />
        </Link>

        <nav className="ml-10">
          <ul className="items-center align-row">
            {navItems.map((item) => (
              <li
                key={item.title}
                className="ml-8 text-light hover:text-accent press"
              >
                <Link href={item.route} target={item.target || ""}>
                  {item.title}
                </Link>
              </li>
            ))}
            <Link href="/#promote-api">
              <li className="ml-8 press centered-row">
                <span className="text-light hover:text-accent">
                  Promote API
                </span>
                <span className="ml-2 bg-accent p-1.5 px-3 rounded-full text-dark text-xs">
                  Makers
                </span>
                <sup className="-mt-3 text-light">✦</sup>
              </li>
            </Link>
          </ul>
        </nav>

        <div className="items-center ml-auto align-row">
          {user && <ProfilePreview />}

          {!user && (
            <BaseButton
              text="Login"
              type="primary"
              styles="h-12 px-8"
              onClick={() => toggleModal("loginModal", true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
