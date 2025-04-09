import React from "react";

interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
}

const Input = (props: InputProps) => {
  const { value, onChange, name, id, placeholder, disabled, required, type } = props;
  return (
    <input
      type={type || "text"}
      name={name}
      id={id}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      disabled={disabled}
      required={required}
      className="border rounded-md p-2 focus:outline-none shadow-md"
      placeholder={placeholder}
    />
  );
}

export default Input;
