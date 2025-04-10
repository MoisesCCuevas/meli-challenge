import React from "react";
import { CloseOutlined } from "@ant-design/icons";

export interface CostumeAlertProps {
  onClose?: () => void | undefined;
  children?: React.ReactNode;
  title?: string;
  type: "success" | "error" | "warning" | "info";
}

const CostumeAlert = (props: CostumeAlertProps) => {
  const { onClose, children, title, type = "info" } = props;
  const types = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800"
  };
  return (
    <div role="alert" className={`top-20 right-0 w-1/4 shadow-md rounded-sm p-4 flex flex-col gap-2 fixed z-50 ${types[type]}`}>
      <div className="w-full flex justify-between items-center">
        <h2 className="font-semibold text-lg">{title}</h2>
        <CloseOutlined onClick={() => onClose && onClose()} />
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default CostumeAlert;
