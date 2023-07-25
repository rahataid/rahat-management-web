'use client';

import { LoadingScreen } from '@components/loading-screen';
import { useEffect } from 'react';
import useAuthStore from './store';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const { isInitialized } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    isInitialized: state.isInitialized,
  }));

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      useAuthStore.setState({
        isAuthenticated: true,
        isInitialized: true,
      });
    } else {
      useAuthStore.setState({
        isAuthenticated: false,
        isInitialized: true,
      });
    }
  }, []);

  if (!isInitialized) {
    // Render a loading screen while the app is initializing
    return <LoadingScreen />;
  }

  return children;
};

export default AuthProvider;
