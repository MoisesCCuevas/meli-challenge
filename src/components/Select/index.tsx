import React from "react";
import { FilterOutlined } from "@ant-design/icons";

interface SelectProps {
  onChange?: (value: string) => void;
  values?: string[];
  defaultValue?: string;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  filter?: boolean;
  value?: string;
}

const Select = (props: SelectProps) => {
  const {
    onChange,
    values,
    defaultValue,
    id,
    name,
    required,
    disabled,
    filter,
    value
  } = props;
  return (
    <div className="flex items-center justify-between flex-1 p-2 gap-3 border rounded-md shadow-md relative">
      <select
        className={`${filter ? "appearance-none" : "w-full"} focus:outline-none`}
        onChange={(e) => onChange && onChange(e.target.value)}
        id={id}
        name={name}
        required={required}
        disabled={disabled}
        value={value}
      >
        <option value="">{defaultValue}</option>
        {values && values.map((value) => (
          <option key={value} value={value}>{value}</option>
        ))}
      </select>
      {filter && (
        <FilterOutlined className="size-6"/>
      )}
    </div>
  );
}

export default Select;
