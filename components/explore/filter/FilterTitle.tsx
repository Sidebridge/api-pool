import { Tooltip } from "antd";
import clsx from "clsx";

type FilterTitleProps = {
  title: string;
  tooltipText?: string;
  onReset: () => void;
};

const FilterTitle = ({
  title = "Section",
  tooltipText = "Clear selected items",
  onReset,
}: FilterTitleProps) => {
  return (
    <div className="items-center w-full mb-3 row-btwn">
      <p className="font-light text-grey">{title}</p>

      <Tooltip title={tooltipText} placement="left">
        <span
          className={clsx(
            "text-2xl text-grey-legacy cursor-pointer",
            "hover:text-grey"
          )}
          onClick={onReset}
        >
          &#8635;
        </span>
      </Tooltip>
    </div>
  );
};

export default FilterTitle;
