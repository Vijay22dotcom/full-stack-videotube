import React, { createContext, useContext, useState, ReactNode } from "react";


interface Alert {
  message: string;
  type: any;
}

interface AlertContextType {
  alert: Alert | null;
  showAlert: (message: string, type: string) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<Alert | null>(null);

  const showAlert = (message: string, type: string) => {
    setAlert({
      message,
      type,
    });

    setTimeout(() => {
      hideAlert();
    }, 3000);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const contextValue: AlertContextType = { alert, showAlert, hideAlert };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }

  return context;
};
