import React from "react";
import { SearchOutlined } from "@ant-design/icons";

interface SearchInputProps {
  onChange: (value: string) => void;    
  value: string;
}

const SearchInput = (props: SearchInputProps) => {
  const { onChange, value } = props;
  return (
    <div className="flex items-center justify-center border w-full rounded-md h-10 p-2 gap-3 select-none">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar producto..."
        className="w-full h-full px-4 text-lg focus:outline-none"
      />
      <SearchOutlined className="size-6" />
    </div>
  );
}

export default SearchInput;
