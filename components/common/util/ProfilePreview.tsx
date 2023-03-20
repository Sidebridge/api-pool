import { useAuth } from "@/store/context/AuthProvider";
import classes from "@/styles/profile-preview.module.css";
import clsx from "clsx";
import AppIcon from "../icons";

import Image from "next/image";
import { useState } from "react";

const profileOptions = [
  { title: "Bookmarks", icon: "BookmarksGreen", action: "showBookmarks" },
  { title: "Submit API", icon: "CodeGreen", action: "suggestAPI" },
  { title: "Added Reviews", icon: "ReviewStarGreen", action: "showReviews" },
  { title: "Logout", icon: "LogoutGreen", action: "signout" },
];

const ProfilePreview = () => {
  const { signOut, user } = useAuth();

  const [isShowProfileOptions, setProfileOptionsState] = useState(false);

  const handleLogout = () => {
    console.log("Heyyyyyy");

    signOut();
  };

  const handleProfileOptionsToggle = (state: boolean) => {
    setProfileOptionsState(state);
  };

  const handleProfileActions = (action: string) => {
    if (action === "signout") handleLogout();
  };

  return (
    <div
      className="relative items-center cursor-pointer align-row"
      onClick={() => handleProfileOptionsToggle(!isShowProfileOptions)}
    >
      <div
        className={clsx(
          "w-10 h-10 overflow-hidden mr-4 bg-black border rounded-full avatar border-grey",
          classes["avatar-bg"]
        )}
      >
        {user?.user_metadata.avatar_url && (
          <Image
            className={clsx("w-full h-full")}
            src={user?.user_metadata.avatar_url}
            width="40"
            height="40"
            alt="APIPool Logo"
            priority
          />
        )}
      </div>

      <p className="font-light text-light">{user?.user_metadata.name}</p>

      <AppIcon name="arrow" icon="DropArrowGreen" styles="ml-3 mt-1" />

      {isShowProfileOptions && (
        <div
          className={clsx(
            "absolute bottom-0 left-auto right-auto z-50 w-full overflow-hidden border border-t-0 h-fit light-border rounded-b-2xl top-14 bg-dark align-col"
          )}
        >
          {profileOptions.map((option) => (
            <div
              className={clsx(
                "items-center p-4 px-6 align-row cursor-pointer",
                "hover:bg-dark-matte"
              )}
              key={option.action}
              onClick={() => handleProfileActions(option.action)}
            >
              <AppIcon
                styles="mr-3 mt-1"
                name={option.title}
                icon={option.icon}
              />
              <span className="font-light text-light">{option.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePreview;
