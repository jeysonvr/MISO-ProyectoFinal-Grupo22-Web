'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

const cookieCutter = require('cookie-cutter');

import { UserType } from '../contants/userType';

interface IAppContextProps {
  user: {
    email?: string;
    type: string;
    language: string;
  }
}

const AppContext = createContext<IAppContextProps>({
  user: {
    type: UserType.anonymous,
    language: 'es',
  }
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<any>({ type: UserType.anonymous });
  const userContext = {
    email: userData?.email,
    type: userData?.type || UserType.anonymous,
    language: 'es',
  }

  const sharedState = {
    user: {
      ...userContext
    }
  };

  useEffect(() => {
    setUserData(
      {
        ...JSON.parse(localStorage?.getItem('user') || '{}'),
        language: cookieCutter.get('NEXT_LOCALE'),
      },
    );
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
