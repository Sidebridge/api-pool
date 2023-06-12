/* eslint-disable @next/next/no-html-link-for-pages */
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { IconMap } from "antd/es/result";
import type { IconType } from "../icons/iconMap";

import classes from "@/styles/profile-preview.module.css";

import AppIcon from "../icons";

import { toggleModal } from "@/store/modal";

import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Tooltip } from "antd";
import Link from "next/link";

const TabBurgerMenu = ({
  styles,
  options,
  drop = true,
  onOpen,
}: {
  styles?: string;
  options: { [key: string]: any }[];
  drop?: boolean;
  onOpen?: () => void;
}) => {
  // const { signOut, user } = useAuth();

  const listStyle = clsx(
    "items-center p-4 px-6 align-row cursor-pointer",
    "hover:bg-grey-light"
  );

  const [isShowMenuOptions, setMenuOptionsState] = useState(false);

  const router = useRouter();

  const handleMenuOptionsToggle = (state: boolean) => {
    if (state && onOpen) onOpen();

    setMenuOptionsState(state);
  };

  const handleMenuActions = (action: string) => {
    if (action === "showBookmarks") toggleModal("bookmarksModal", true);

    if (action === "showMyReviews") router.push("/added-reviews");
  };

  useEffect(() => {
    if (!drop) setMenuOptionsState(false);
  }, [drop]); // Include `myProp` in the dependency array

  return (
    <div
      className={clsx("relative items-center align-row", styles)}
      onClick={() => handleMenuOptionsToggle(!isShowMenuOptions)}
    >
      <div className="h-8 mr-2 border border-grey-border"></div>
      <AppIcon
        name="arrow"
        icon={isShowMenuOptions ? "CloseGreen" : "BurgerMenu"}
        styles={clsx("w-8 press", isShowMenuOptions && "opacity-75")}
      />

      {isShowMenuOptions && (
        <div
          className={clsx(
            "absolute bottom-0 right-0 z-50 w-fit  overflow-hidden border border-t-0 h-fit light-border rounded-b-2xl top-14 bg-dark align-col"
          )}
        >
          <nav>
            <ul>
              {options.map((option) => (
                <Link
                  key={option.action}
                  href={option.route}
                  target={option.target || ""}
                >
                  <div
                    className={listStyle}
                    onClick={() => handleMenuActions(option.action)}
                  >
                    {/* <AppIcon
                styles="mr-3 mt-1"
                name={option.title}
                icon={option.icon as IconType}
              /> */}
                    <Tooltip
                      key={option.title}
                      title={!option.available ? "Coming Soon ✨" : ""}
                      placement="bottom"
                    >
                      <li
                        className={clsx(
                          " text-light hover:text-accent press",
                          router.pathname === option.route &&
                            "opacity-50 disabled"
                        )}
                      >
                        {option.title}
                      </li>
                    </Tooltip>
                  </div>
                </Link>
              ))}
              <a href="/#promote-api">
                <div className={listStyle}>
                  <li className="items-center align-row">
                    <span className="text-light hover:text-accent">
                      Promote API
                    </span>
                    <span className="ml-2 bg-accent p-1.5 px-3 rounded-full text-dark text-xs">
                      Makers
                    </span>
                    <sup className="-mt-3 text-light">✦</sup>
                  </li>
                </div>
              </a>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default TabBurgerMenu;
