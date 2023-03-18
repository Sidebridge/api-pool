import clsx from "clsx";
import { MouseEventHandler } from "react";
import AppIcon from "../icons";

type BasePillProps = {
  name?: string;
  preIcon?: string;
  postIcon?: string;
  text: string;
  styles?: string;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
};

const BasePill = ({
  name,
  preIcon,
  postIcon,
  text,
  styles,
  onClick,
}: BasePillProps) => {
  return (
    <div
      className={clsx(
        "centered-row p-3 px-5 box-border border light-border bg-dark-matte rounded-full cursor-pointer",
        "hover:border-opacity-60",
        styles
      )}
      onClick={onClick}
    >
      {preIcon && <AppIcon name={name} icon={preIcon} styles="w-6 h-6 mr-3" />}
      <span className="font-light text-white">{text}</span>
      {postIcon && (
        <AppIcon name={name} icon={postIcon} styles="w-6 h-6 ml-3" />
      )}
    </div>
  );
};

export default BasePill;
