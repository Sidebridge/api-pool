import { useAuth } from "@/store/context/AuthProvider";
import classes from "@/styles/profile-preview.module.css";
import clsx from "clsx";
import AppIcon from "../icons";

import Image from "next/image";

const ProfilePreview = () => {
  const { signOut, user } = useAuth();

  const handleLogout = () => {
    console.log("Heyyyyyy");

    signOut();
  };

  return (
    <div
      className="items-center cursor-pointer align-row"
      onClick={handleLogout}
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
    </div>
  );
};

export default ProfilePreview;
