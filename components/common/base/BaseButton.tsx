import { useState } from "react";
import { Button } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";

type BaseButtonProps = {
  children: React.ReactNode;
  btnSize: "large" | "small" | "middle";
  icon: React.ReactNode;
  shape: "circle" | "default" | "round" | undefined;
};

const BaseButton = ({ children, btnSize, icon, shape }: BaseButtonProps) => {
  const [size, setSize] = useState<SizeType>(btnSize);

  return (
    <Button type="primary" shape={shape} icon={icon} size={size}>
      {children}
    </Button>
  );
};

export default BaseButton;
