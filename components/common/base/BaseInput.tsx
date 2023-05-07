import clsx from "clsx";
import { useState } from "react";

type BaseInputProps = {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  maxLength?: number;
  row?: number;
  value?: string;
  labelStyle?: string;
  inputStyle?: string;
  styles?: string;
  onChange: (value: string) => void;
};

const BaseInput = ({
  id,
  label,
  placeholder,
  required = true,
  type = "text",
  maxLength,
  row,
  value,
  labelStyle,
  inputStyle,
  styles,
  onChange,
}: BaseInputProps) => {
  return (
    <div className={clsx("mb-5 input-group align-col", styles)}>
      {label && (
        <label htmlFor={id} className={clsx("mb-1.5 w-fit", labelStyle)}>
          {label}
          {!required && <span className="ml-2">(Optional)</span>}
        </label>
      )}
      {!(type === "textarea") ? (
        <input
          id={id}
          className={clsx(
            "w-full h-12 bg-[#0D0D0D] box-border border border-dark outline-none px-4 py-2 text-light text-base",
            "hover:border-grey-lighter hover:border-opacity-40 focus:border-grey-lighter focus:border-opacity-40  focus:bg-dark placeholder:opacity-40 hover:placeholder:opacity-100  placeholder:text-grey-lighter placeholder:font-light placeholder:text-sm",
            inputStyle
          )}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div className="w-full align-col">
          <textarea
            id={id}
            className={clsx(
              "bg-dark border border-dark mt-2 rounded-3xl p-4 py-3 text-light text-base z-10",
              "hover:border-grey-lighter hover:border-opacity-40 placeholder:text-grey-lighter placeholder:opacity-40 hover:placeholder:opacity-100 placeholder:font-light focus:bg-dark-matte focus:outline-none focus:border-grey-lighter focus:border-opacity-40  placeholder:text-sm",
              inputStyle
            )}
            style={{ backgroundColor: "#0D0D0D" }}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={row}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <label
            htmlFor={id}
            className="w-fit p-1.5 text-right text-grey font-light text-xs -mt-8 ml-auto mr-3 z-20"
          >
            {`${value?.length}/${maxLength} characters`}
          </label>
        </div>
      )}
    </div>
  );
};

export default BaseInput;
