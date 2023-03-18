import clsx from "clsx";

type FilterListProps = {
  label: string;
  value: string;
  count?: number;
  styles?: string;
  onCheck: () => void;
};

const FilterList = ({
  label,
  value,
  count = 20,
  styles,
  onCheck,
}: FilterListProps) => {
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
          className={clsx(
            "primary-checkbox",
            "w-4 h-4 text-primary bg-primary rounded-sm cursor-pointer",
            " focus:bg-primary"
          )}
          onChange={onCheck}
        />
        <label
          htmlFor={label}
          className="ml-3 text-base font-light cursor-pointer text-light"
        >
          {label}
        </label>
      </div>

      <span className="font-light text-grey">{count}</span>
    </div>
  );
};

export default FilterList;
