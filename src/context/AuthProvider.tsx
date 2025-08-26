import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(
    () => sessionStorage.getItem("authToken") || null
  );

  const saveToken = (newToken: string | null) => {
    setAuthToken(newToken);
    if (newToken) {
      sessionStorage.setItem("authToken", newToken);
    } else {
      sessionStorage.removeItem("authToken");
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};
