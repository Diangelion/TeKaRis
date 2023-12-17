import React, { createContext, useState, ReactNode } from "react";

interface ContextProviderProps {
  children: ReactNode;
}

export interface TeKaRisContextType {
  auth: AuthProps | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthProps | null>>;
}

export interface AuthProps {
  uid: string;
  email: string;
  token: TokenData;
}

interface TokenData {
  accessToken: string;
  expirationTime: number;
  refreshToken: string;
}

const AuthContext = createContext<TeKaRisContextType | null>({
  auth: null,
  setAuth: () => {},
});

const ContextProvider = ({ children }: ContextProviderProps) => {
  // Define state menggunakan lazy loading, mengecek localstorage apakah session ada atau tidak
  const [auth, setAuth] = useState<AuthProps | null>(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, ContextProvider };
