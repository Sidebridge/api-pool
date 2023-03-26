import { ApiServiceDomain } from "@/types/api-service.interface";
import clsx from "clsx";
import { useState } from "react";
import AppIcon from "../icons";

type BaseSelectProps = {
  id: string;
  label?: string;
  required?: boolean;
  value?: string;
  valueProp: string;
  textProp: string;
  options: Array<SelectOption>;
  onChange: (value: string) => void;
};

// type SelectOption = {
//   title: string;
//   value: string;
//   id?: string;
// };

type SelectOption = {
  [key: string]: string;
};

const BaseSelect = ({
  id,
  label,
  required = true,
  value,
  valueProp,
  textProp,
  options,
  onChange,
}: BaseSelectProps) => {
  return (
    <div className="mb-5 input-group align-col">
      <label htmlFor={id} className="mb-1.5 text-sm font-light">
        {label}
        {!required && <span className="ml-2 text-grey">(Optional)</span>}
      </label>

      <div className="items-center align-row">
        <select
          name=""
          id={id}
          className={clsx(
            "w-full appearance-none h-12 box-border border light-border bg-dark-matte outline-none rounded-full px-4 py-2 text-light text-base",
            "focus:border-grey hover:border-grey focus:bg-dark"
          )}
          defaultValue=""
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" selected></option>
          {options.map((option: SelectOption) => (
            <option
              value={option[valueProp]}
              key={option.id || option.name || option.title}
            >
              {option[textProp]}
            </option>
          ))}
        </select>

        <AppIcon
          name="select-arrow"
          icon="DropArrowGreen"
          styles="-ml-10 mt-1 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default BaseSelect;
