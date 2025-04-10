import { useContext } from "react";
import { AlertContext } from "@/components/CostumeAlertProvider";

const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert deberia estar dentro de un CostumeAlertProvider");
  }
  return context;
}

export default useAlert;
