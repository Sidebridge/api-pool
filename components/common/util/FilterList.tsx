import clsx from "clsx";

type FilterListProps = {
  label: string;
  value: unknown;
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
    <div className="w-full row-btwn items-center">
      <div className="align-row items-center mb-2 ">
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
          className="ml-3 text-base font-light text-light cursor-pointer"
        >
          {label}
        </label>
      </div>

      <span className="text-grey font-light">{count}</span>
    </div>
  );
};

export default FilterList;
