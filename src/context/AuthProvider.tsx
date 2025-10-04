import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(
    () => sessionStorage.getItem("authToken") || null
  );
  const [name, setName] = useState<string | null>(
    () => sessionStorage.getItem("name") || null
  );
  const [userId, setUserId] = useState<string | null>(
    () => sessionStorage.getItem("userId") || null
  );
  const [email, setEmail] = useState<string | null>(
    () => sessionStorage.getItem("email") || null
  );
  const saveToken = (newToken: string | null) => {
    setAuthToken(newToken);
    if (newToken) {
      sessionStorage.setItem("authToken", newToken);
    } else {
      sessionStorage.removeItem("authToken");
    }
  };
  const saveName = (newName: string | null) => {
    setName(newName);
    if (newName) {
      sessionStorage.setItem("name", newName);
    } else {
      sessionStorage.removeItem("name");
    }
  };
  const saveUserId = (newUserId: string | null) => {
    setUserId(newUserId);
    if (newUserId) {
      sessionStorage.setItem("userId", newUserId);
    } else {
      sessionStorage.removeItem("userId");
    }
  };

  const saveEmail = (newEmail: string | null) => {
    setEmail(newEmail);
    if (newEmail) {
      sessionStorage.setItem("email", newEmail);
    } else {
      sessionStorage.removeItem("email");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken: saveToken,
        name,
        setName: saveName,
        userId,
        setUserId: saveUserId,
        email,
        setEmail: saveEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
