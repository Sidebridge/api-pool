import Image from "next/image";
import { Button, Input } from "antd";
import clsx from "clsx";

import AppIcon from "../icons";

const SearchInput = () => {
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e);
  };

  return (
    <div className="align-row w-full rounded-full border border-grey">
      <div className="align-row items-center p-1 pl-3 w-full">
        <AppIcon icon="Search" name="search" />
        <Input
          className={clsx(
            "bg-transparent outline-none border-none text-white placeholder-grey text-base flex flex-grow",
            "focus:border-none focus:outline-none"
          )}
          placeholder="Search API by name, or use case"
          type="text"
          bordered={false}
          onChange={onChange}
        />

        <Button
          className={clsx(
            "bg-primary text-dark text-center font-medium text-lg leading-relaxed",
            ""
          )}
          type="ghost"
          shape="round"
          icon=""
          size="large"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchInput;
