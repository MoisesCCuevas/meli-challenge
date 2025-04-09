import React from "react";

interface TextAreaProps {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

const TextArea = (props: TextAreaProps) => {
  const { value, onChange, name, id, placeholder, disabled, required } = props;
  return (
    <textarea
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

export default TextArea;
