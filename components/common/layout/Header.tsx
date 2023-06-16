/* eslint-disable @next/next/no-html-link-for-pages */
import { clsx } from "clsx";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

import { Button, Tooltip } from "antd";
import AppLogo from "../base/AppLogo";
import ProfilePreview from "../util/ProfilePreview";
import BaseButton from "../base/BaseButton";
import TabBurgerMenu from "../util/TabletBurgerMenu";

import { toggleModal } from "@/store/modal";

// import { useAuth } from "@/store/context/AuthProvider";

const navItems = [
  { title: "Explore", route: "/explore", available: true },
  { title: "Compare APIs", route: "/compare", available: false },
  { title: "Donate", route: "/", target: "", available: true },
];

function Header() {
  const [droppedMenu, setDroppedMenu] = useState<string>("");

  // const { auth } = useAuth();
  const user = useUser();

  const router = useRouter();

  return (
    <>
      {/* <div className="z-[50] sticky top-0 w-full p-4 notice-banner bg-accent centered-col">
        <p>This platform is still a work in progress ⚙️</p>
      </div> */}

      <div
        className={clsx(
          "align-row py-4 px-10 lg:px-24 bg-body items-center",
          "border-b border-grey-legacy border-opacity-10"
        )}
        style={{ zIndex: 90 }}
      >
        <Link href="/">
          <AppLogo />
        </Link>

        <nav className="hidden ml-10 lg:flex">
          <ul className="items-center align-row">
            {navItems.map((item) => (
              <Tooltip
                key={item.title}
                title={!item.available ? "Coming Soon ✨" : ""}
                placement="bottom"
              >
                <li
                  className={clsx(
                    "ml-8 text-light hover:text-accent press",
                    router.pathname === item.route && "opacity-50 disabled"
                  )}
                >
                  <Link href={item.route} target={item.target || ""}>
                    {item.title}
                  </Link>
                </li>
              </Tooltip>
            ))}
            <a href="/#promote-api">
              <li className="ml-8 press centered-row">
                <span className="text-light hover:text-accent">
                  Promote API
                </span>
                <span className="ml-2 bg-accent p-1.5 px-3 rounded-full text-dark text-xs">
                  Makers
                </span>
                <sup className="-mt-3 text-light">✦</sup>
              </li>
            </a>
          </ul>
        </nav>

        <div className="items-center ml-auto align-row">
          {user && (
            <ProfilePreview
              drop={droppedMenu === "profile"}
              onOpen={() => setDroppedMenu("profile")}
            />
          )}

          {!user && (
            <BaseButton
              text="Login"
              type="primary"
              styles="h-12 px-8"
              onClick={() => toggleModal("loginModal", true)}
            />
          )}

          <TabBurgerMenu
            styles="ml-4 lg:hidden"
            options={navItems}
            drop={droppedMenu === "navigation"}
            onOpen={() => {
              setDroppedMenu("navigation");
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
