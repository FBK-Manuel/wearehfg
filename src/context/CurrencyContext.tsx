// CurrencyContext.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import currency from "currency.js";
import { getSymbol } from "./currencyHelpers";
import { CurrencyContext } from "./AuthContext";

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [rates, setRates] = useState<{ [key: string]: number }>({ USD: 1 });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get(
          `https://apilayer.net/api/live?access_key=f08e2340f89ba6ad777f5acc995d60ba&currencies=EUR,GBP,CAD,PLN,NGN&source=USD&format=1`
        );
        if (res.data?.quotes) {
          const parsedRates: { [key: string]: number } = { USD: 1 };
          Object.entries(res.data.quotes).forEach(([pair, rate]) => {
            const target = pair.replace("USD", "");
            parsedRates[target] = rate as number;
          });
          setRates(parsedRates);
        }
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };
    fetchRates();
  }, []);

  const formatPrice = (amount: number) => {
    const rate = rates[currencyCode] ?? 1;
    const converted = amount * rate;
    return currency(converted, {
      symbol: getSymbol(currencyCode),
      precision: 2,
    }).format();
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency: currencyCode,
        setCurrency: setCurrencyCode,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
