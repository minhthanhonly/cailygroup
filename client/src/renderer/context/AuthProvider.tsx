import React, { createContext, FC, useState } from "react";

interface AuthContextProps {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthContext = createContext<AuthContextProps>({ auth: {}, setAuth: () => {} });

const AuthProvider: FC = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
