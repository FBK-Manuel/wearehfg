// useCurrency.ts
import { useContext } from "react";
import { CurrencyContext } from "./CurrencyContext";

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
};
