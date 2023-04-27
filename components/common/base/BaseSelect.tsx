import { ApiServiceDomain } from "@/types/api-service.interface";
import clsx from "clsx";
import { useState } from "react";
import AppIcon from "../icons";

type BaseSelectProps = {
  id: string;
  label?: string;
  labelStyle?: string;
  inputStyle?: string;
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
  labelStyle,
  inputStyle,
  required = true,
  value,
  valueProp,
  textProp,
  options,
  onChange,
}: BaseSelectProps) => {
  return (
    <div className="mb-5 input-group align-col">
      <label htmlFor={id} className={clsx("mb-1.5 w-fit", labelStyle)}>
        {label}
        {!required && <span className="ml-2 text-grey">(Optional)</span>}
      </label>

      <div className="items-center align-row">
        <select
          name=""
          id={id}
          className={clsx(
            "w-full h-12 box-border border bg-transparent appearance-none border-dark outline-none px-4 py-2 text-light text-base",
            "hover:border-grey-lighter hover:border-opacity-40 focus:border-grey-lighter focus:border-opacity-40  focus:bg-dark placeholder:opacity-40 hover:placeholder:opacity-100  placeholder:text-grey-lighter placeholder:font-light placeholder:text-sm",
            inputStyle
          )}
          defaultValue=""
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" className="text-sm text-grey-lighter" selected>
            {/* Select Option */}
          </option>
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
