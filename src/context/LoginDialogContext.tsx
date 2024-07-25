// app/contexts/LoginDialogContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface LoginDialogContextType {
  isLoginDialogVisible: boolean;
  setIsLoginDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginDialogContext = createContext<LoginDialogContextType | undefined>(
  undefined
);

export const LoginDialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoginDialogVisible, setIsLoginDialogVisible] = useState(false);

  return (
    <LoginDialogContext.Provider
      value={{
        isLoginDialogVisible,
        setIsLoginDialogVisible,
      }}
    >
      {children}
    </LoginDialogContext.Provider>
  );
};

export const useLoginDialog = () => {
  const context = useContext(LoginDialogContext);
  if (context === undefined) {
    throw new Error("useLoginDialog must be used within a LoginDialogProvider");
  }
  return context;
};
