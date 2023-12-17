import React, { useContext } from "react";
import { Redirect } from "react-router";

// Context
import { AuthContext } from "../context/ContextProvider";
import { TeKaRisContextType } from "../context/ContextProvider";

// Component untuk pengecekan apakah session ada atau tidak
const RedirectRoute: React.FC = () => {
  // Mengambil state auth dari context karena session disimpan dalam state auth
  const authContext = useContext(AuthContext) as TeKaRisContextType;
  const { auth } = authContext;

  return auth ? <Redirect to="/home" /> : <Redirect to="/login" />;
};

export default RedirectRoute;
