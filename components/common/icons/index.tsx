import Image from "next/image";

import iconMap from "./iconMap";

type AppIconProps = {
  icon: string;
  name: string;
  styles?: string;
};

const AppIcon = ({ icon, name, styles }: AppIconProps) => {
  return <Image className={styles} src={iconMap[icon]} alt={name} />;
};

export default AppIcon;
