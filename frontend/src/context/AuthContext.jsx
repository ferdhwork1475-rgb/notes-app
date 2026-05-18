import { createContext, useState, useEffect } from "react";
import { verifyUser } from "../services/authService";
import ClipLoader from "react-spinners/ClipLoader";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  

  return (
    <AuthContext.Provider value={{ }}>
      {children}
    </AuthContext.Provider>
  );
};
