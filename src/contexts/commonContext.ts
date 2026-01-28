import React, { createContext } from "react";
import type { CommonContextType } from "../types/Context"

export const CommonContext = createContext<CommonContextType | null>(null)

export const CommonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  return React.createElement(
    CommonContext.Provider,
    { value: { emailPattern, passwordPattern } },
    children
  );
};