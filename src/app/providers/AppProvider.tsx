'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserType } from '../contants/userType';

interface IAppContextProps {
  user: {
    email?: string;
    type: string;
  }
}

const AppContext = createContext<IAppContextProps>({
  user: {
    type: UserType.anonymous,
  }
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // const userData = JSON.parse(localStorage?.getItem('user') || '{}');
  const [userData, setUserData] = useState<any>({ type: UserType.anonymous });
  const userContext = {
    email: userData?.email,
    type: userData?.type || UserType.anonymous,
  }

  const sharedState = {
    user: {
      ...userContext
    }
  };

  useEffect(() => {
    setUserData(JSON.parse(localStorage?.getItem('user') || '{}'));
  }, []);

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
