import clsx from "clsx";
import Image from "next/image";

import iconMap from "./iconMap";

type AppIconProps = {
  icon: keyof typeof iconMap;
  name?: string;
  styles?: string;
  priority?: boolean;
  onClick?: () => void;
};

const AppIcon = ({
  icon,
  name,
  styles,
  priority = false,
  onClick,
}: AppIconProps) => {
  return (
    <Image
      className={clsx("", styles)}
      src={iconMap[icon]}
      alt={name || ""}
      draggable="false"
      priority={priority}
      onClick={onClick}
    />
  );
};

export default AppIcon;
