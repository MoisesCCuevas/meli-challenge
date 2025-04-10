"use client";

import React, { useState, createContext, useCallback, useMemo } from "react";
import CostumeAlert, { CostumeAlertProps } from "../CostumeAlert";

interface AlertContextType {
  setAlert: (alert: CostumeAlertProps) => void;
}

interface AlertProviderProps {
  children: React.ReactNode;
}

export const AlertContext = createContext<AlertContextType | null>(null);

const AlertProvider = (props: AlertProviderProps) => {
  const { children } = props;
  const [alert, setAlert] = useState<CostumeAlertProps | null>(null);

  const closeAlert = useCallback(() => {
    setAlert(null);
  }, []);

  const setAlertHandler = useCallback((alert: CostumeAlertProps) => {
    setAlert(alert);
  }, []);

  const value = useMemo(() => ({ setAlert: setAlertHandler }), [setAlertHandler]);

  return (
    <AlertContext.Provider value={value}>
      {alert && (
        <CostumeAlert
          type={alert.type}
          title={alert.title}
          onClose={closeAlert}
        >
          {alert.children}
        </CostumeAlert>
      )}
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
