import Image from "next/image";
import { Button, Input } from "antd";
import clsx from "clsx";
import { useState } from "react";

import AppIcon from "../icons";

type SearchInputProps = {
  style?: string;
  placeholder: string;
  processing: boolean;
  onClick: (value: string) => void;
  onSearch: (searchTerm: string) => void;
};

const SearchInput = ({
  style,
  placeholder,
  processing,
  onClick,
  onSearch,
}: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <div
      className={clsx(
        "align-row w-full rounded-full border border-grey",
        style
      )}
    >
      <div className="items-center w-full p-1 pl-3 align-row">
        <AppIcon icon="Search" name="search" />
        <Input
          className={clsx(
            "bg-transparent outline-none border-none text-white placeholder-grey text-base flex flex-grow",
            "focus:border-none focus:outline-none"
          )}
          placeholder={placeholder}
          type="text"
          bordered={false}
          onChange={onChange}
          onKeyDown={handleKeyPress}
        />

        <Button
          className={clsx(
            "bg-primary text-dark text-center font-medium text-lg leading-relaxed",
            processing && "disabled"
          )}
          type="ghost"
          shape="round"
          icon=""
          size="large"
          loading={processing}
          disabled={processing}
          onClick={() => onClick(searchTerm)}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchInput;
