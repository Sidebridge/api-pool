import { Tooltip } from "antd";
import clsx from "clsx";

import AppIcon from "../icons";
import type { IconType } from "../icons/iconMap";
import PulseLoader from "../util/PulseLoader";

type BaseButtonProps = {
  id?: string;
  styles?: string;
  icon?: IconType;
  postIcon?: IconType;
  iconStyles?: string;
  text?: string;
  type?: "primary" | "secondary" | "default";
  tooltip?: string;
  loading?: boolean;
  loaderStyle?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
};

const BaseButton = ({
  id,
  styles,
  icon,
  postIcon,
  iconStyles,
  text,
  type = "primary",
  tooltip,
  loading = false,
  loaderStyle = "",
  disabled = false,
  children,
  onClick = () => {},
}: BaseButtonProps) => {
  const typeStyles: { [key: string]: string } = {
    primary: "bg-primary",
    secondary: "hover:bg-transparent border border-grey-border text-light",
  };

  return (
    <Tooltip title={tooltip} placement="topRight">
      <button
        id={id}
        className={clsx(
          "relative overflow-hidden press py-3 rounded-full box-border font-normal",
          (disabled || loading) && "disabled",
          typeStyles[type],
          styles
        )}
        disabled={disabled || loading}
        onClick={onClick}
      >
        {type === "secondary" && (
          <span
            id={`${id}-span`}
            className={clsx("absolute inset-0 z-0 animate-unfill")}
          ></span>
        )}

        <div className="relative z-10 items-center w-full h-full align-row">
          {icon && <AppIcon icon={icon} name="icon" styles={iconStyles} />}

          {children}

          {loading && <PulseLoader styles={loaderStyle} />}

          {text && (
            <p className={clsx((icon || children) && "ml-2.5")}>{text}</p>
          )}

          {postIcon && (
            <AppIcon icon={postIcon} name="icon" styles={iconStyles} />
          )}
        </div>
      </button>
    </Tooltip>
  );
};

export default BaseButton;
