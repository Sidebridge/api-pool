import { Tooltip } from "antd";
import clsx from "clsx";
import AppIcon from "../icons";

type BookmarkBtnProp = {
  styles?: string;
  active?: boolean;
};

const BookmarkBtn = ({ styles, active = false }: BookmarkBtnProp) => {
  return (
    <Tooltip title="Bookmark" placement="bottomRight">
      <div
        className={clsx(
          "flex items-center justify-center rounded-full w-7 h-7 bg-black press",
          styles
        )}
      >
        <AppIcon
          icon={!active ? "BookmarkWhite" : "BookmarkedWhite"}
          name="bookmark"
          styles="w-4 h-4"
        />
      </div>
    </Tooltip>
  );
};

export default BookmarkBtn;
