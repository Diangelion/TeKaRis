import React, { createContext, useState, ReactNode } from "react";

interface ContextProviderProps {
  children: ReactNode;
}

interface TeKaRisContextType {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<TeKaRisContextType | undefined>(undefined);

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [auth, setAuth] = useState<any>(/* initial value for auth */);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, ContextProvider };
