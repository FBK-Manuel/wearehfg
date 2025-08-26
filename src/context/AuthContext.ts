import { createContext } from "react";
import type {
  AuthContextType,
  CurrencyContextType,
} from "../dataType/DataType";

// Only context here
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// 👉 Export the context itself
export const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);
