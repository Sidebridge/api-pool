import { useEffect, useState } from "react";

import AppIcon from "../common/icons";
import ApiCard from "../common/util/ApiCard";

import { getUserApiBookmarks, userApiBookmarks } from "@/store/bookmarks";

import { useUser } from "@supabase/auth-helpers-react";

const BookmarksList = ({ onClose }: { onClose: () => void }) => {
  const user = useUser();

  const allBookmarks = userApiBookmarks.use();

  useEffect(() => {
    getUserApiBookmarks(user?.id || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full pb-4 text-white border align-col bg-body border-dark">
      <div className="sticky top-0 z-10 w-full p-6 px-8 border-b bg-body border-dark form-header align-col">
        <div className="items-center align-row">
          <AppIcon icon={"BookmarksGreen"} styles="mr-3" />
          <h1 className="text-xl font-normal text-light-new">
            Your API Product Bookmarks
          </h1>
        </div>
        <p className="text-grey-lighter text-sm font-light mt-0.5">
          List of API services you find interesting and kept for future
          referencing.
        </p>
      </div>

      {allBookmarks && allBookmarks.length ? (
        <div className="z-0 grid w-full grid-flow-row grid-cols-2 p-6 blog-posts gap-x-4 gap-y-4">
          {allBookmarks.map((bookmark, bookmarkIndex) => (
            <ApiCard
              key={bookmark.id}
              service={bookmark.api_services}
              onAction={() => onClose()}
            />
          ))}
        </div>
      ) : (
        <div className="w-full font-light capitalize h-96 centered-col text-grey-lighter">
          <AppIcon icon="EmptyList" name="empty-bookmark" />
          <span className="mt-3">You have no bookmarks yet!</span>
        </div>
      )}
    </div>
  );
};

export default BookmarksList;
