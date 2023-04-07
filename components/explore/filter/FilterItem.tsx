import { icons } from "antd/es/image/PreviewGroup";
import clsx from "clsx";
import AppIcon from "../../common/icons";

type FilterItemProps = {
  label: string;
  value: string;
  count?: number;
  styles?: string;
  iconUrl?: string | null;
  iconName?: string | null;
  checked?: boolean;
  onCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FilterItem = ({
  label,
  value,
  count = 20,
  iconUrl,
  iconName,
  styles,
  checked = false,
  onCheck,
}: FilterItemProps) => {
  return (
    <div className="items-center w-full row-btwn">
      <div className="items-center mb-2 align-row ">
        {/* <Checkbox className="" onChange={onCheck}>
          {label}
        </Checkbox> */}

        <input
          id={label}
          type="checkbox"
          value={value}
          checked={checked}
          className={clsx(
            "primary-checkbox",
            "w-4 h-4 text-primary bg-primary rounded-sm cursor-pointer",
            " focus:bg-primary"
          )}
          onChange={(e) => onCheck(e)}
        />
        <label
          htmlFor={label}
          className="items-center ml-3 text-base font-light cursor-pointer align-row text-light"
        >
          {iconUrl && <img className="w-3 h-3 mr-3" src={iconUrl} alt="" />}

          {iconName && (
            <AppIcon name={iconName} icon={iconName} styles="w-3 h-3" />
          )}

          <span>{label}</span>
        </label>
      </div>

      {/* <span className="font-light text-grey">{count}</span> */}
    </div>
  );
};

export default FilterItem;
