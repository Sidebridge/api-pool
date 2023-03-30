import Image from "next/image";
import { Button, Input } from "antd";
import clsx from "clsx";
import { useState, InputHTMLAttributes, forwardRef } from "react";

import AppIcon from "../icons";
import { icons } from "antd/es/image/PreviewGroup";

type CustomInputProps = {
  style?: string;
  btnText: String;
  placeholder: string;
  processing: boolean;
  icon: string;
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
          "align-row w-full rounded-full border border-grey",
          "focus:border-light hover:border-light",
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

          <Button
            className={clsx(
              "bg-primary text-dark text-center font-medium text-lg leading-relaxed",
              (processing || disabled) && "disabled"
            )}
            type="ghost"
            shape="round"
            icon=""
            size="large"
            loading={processing}
            disabled={processing || disabled}
            onClick={() => onClick(inputText)}
          >
            {btnText}
          </Button>
        </div>
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
