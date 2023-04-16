import Image from "next/image";
import { Button, Input } from "antd";
import clsx from "clsx";
import { useState, InputHTMLAttributes, forwardRef } from "react";

import AppIcon from "../icons";
import BaseButton from "../base/BaseButton";
import PulseLoader from "./PulseLoader";

import type { IconType } from "../icons/iconMap";

type CustomInputProps = {
  style?: string;
  btnText: string;
  placeholder: string;
  processing: boolean;
  icon: IconType;
  disabled?: boolean;
  onClick: (value: string) => void;
  onEnter: (inputText: string) => void;
  onBlur?: () => void;
  onChange: (inputText: string) => void;
};

type Props = CustomInputProps & React.InputHTMLAttributes<HTMLInputElement>;

const CustomInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      style,
      btnText,
      placeholder,
      processing,
      disabled = false,
      icon,
      onClick,
      onEnter,
      onBlur,
      onChange,
    },
    ref
  ) => {
    const [inputText, setInputText] = useState<string>("");

    function onInputChange(
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      setInputText(e.target.value);
      onChange(e.target.value);
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
      if (event.key === "Enter") {
        onEnter(inputText);
      }
    }

    return (
      <div
        className={clsx(
          "align-row w-full rounded-full border",
          "focus:border-grey-lighter hover:border-grey-lighter",
          style
        )}
      >
        <div className="items-center w-full p-1 pl-3 align-row">
          <AppIcon icon={icon} name={icon.toLowerCase()} />
          <input
            ref={ref}
            className={clsx(
              "bg-transparent outline-none border-none text-white placeholder-grey text-base ml-2 flex flex-grow",
              "focus:border-none focus:outline-none"
            )}
            placeholder={placeholder}
            type="text"
            onChange={onInputChange}
            onKeyDown={handleKeyPress}
            onBlur={onBlur}
          />

          <BaseButton
            text={btnText}
            type="primary"
            styles="px-4 bg-primary text-lg h-full"
            loading={processing}
            loaderStyle="mr-2.5 w-4 h-4"
            disabled={processing || disabled}
            onClick={() => onClick(inputText)}
          />
        </div>
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
