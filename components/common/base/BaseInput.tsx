import clsx from "clsx";
import { useState } from "react";

type BaseInputProps = {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  maxLength?: number;
  value?: string;
  onChange: (value: string) => void;
};

const BaseInput = ({
  id,
  label,
  placeholder,
  required = true,
  type = "text",
  maxLength,
  value,
  onChange,
}: BaseInputProps) => {
  return (
    <div className="mb-5 input-group align-col">
      {label && (
        <label htmlFor={id} className="mb-1.5 text-sm font-light">
          {label}
          {!required && <span className="ml-2 text-grey">(Optional)</span>}
        </label>
      )}
      {!(type === "textarea") ? (
        <input
          id={id}
          className={clsx(
            "w-full h-12 box-border border light-border bg-dark-matte outline-none rounded-full px-4 py-2 text-light text-base",
            "focus:border-grey hover:border-grey focus:bg-dark placeholder:text-grey placeholder:font-light placeholder:text-sm"
          )}
          placeholder={placeholder || "Enter value here"}
          type={type}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div className="w-full align-col">
          <textarea
            id={id}
            className={clsx(
              "bg-dark-matte border light-border mt-2 rounded-3xl p-4 py-3 text-light text-base z-10",
              "placeholder:text-grey placeholder:font-light focus:bg-dark focus:outline-none focus:border-grey hover:border-grey placeholder:text-sm"
            )}
            placeholder="Write a short description on what this API service does"
            maxLength={maxLength}
            rows={3}
            onChange={(e) => onChange(e.target.value)}
          />
          <p className="w-full p-1.5 text-right text-grey font-light text-xs -mt-8 -ml-3 z-20">
            {`${value?.length}/${maxLength} characters`}
          </p>
        </div>
      )}
    </div>
  );
};

export default BaseInput;
