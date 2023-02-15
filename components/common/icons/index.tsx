import Image from "next/image";

import iconMap from "./iconMap";

type AppIconProps = {
  icon: string;
  name: string;
  styles?: string;
  onClick?: () => void;
};

const AppIcon = ({ icon, name, styles, onClick }: AppIconProps) => {
  return (
    <Image
      className={styles}
      src={iconMap[icon as keyof {}]}
      alt={name}
      onClick={onClick}
    />
  );
};

export default AppIcon;
