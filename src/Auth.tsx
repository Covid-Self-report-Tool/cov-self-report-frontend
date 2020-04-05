import React, { useEffect, useState, createContext } from 'react';
import { app } from 'config';

type AuthProviderProps = {
  children: any;
};

export const AuthContext = createContext(null);

export const AuthProvider = (props: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  const { children } = props;

  return (
    // @ts-ignore
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
