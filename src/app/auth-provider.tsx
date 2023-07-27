'use client';

import { LoadingScreen } from '@components/loading-screen';
import { getToken, getWalletName } from '@utils/storage-available';
import { metaMask } from '@web3/connectors/metaMask';
import { useEffect } from 'react';
import useAuthStore from 'src/store/auths';

type Props = {
  children: React.ReactNode;
};

const localWalletName = getWalletName();
const token = getToken();
const AuthProvider = ({ children }: Props) => {
  const { isInitialized, walletName } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    isInitialized: state.isInitialized,
    walletName: state.walletName,
  }));

  useEffect(() => {
    if (token && localWalletName) {
      useAuthStore.setState({
        isAuthenticated: true,
        isInitialized: true,
        walletName: localWalletName,
      });
    } else {
      useAuthStore.setState({
        isAuthenticated: false,
        isInitialized: true,
        walletName: undefined,
      });
    }
  }, []);

  // attempt to connect metamask eagerly on mount
  useEffect(() => {
    if (walletName && walletName === 'MetaMask') {
      metaMask.connectEagerly().catch(() => {
        console.debug('Failed to connect eagerly to metamask');
      });
    }
  }, [walletName]);

  if (!isInitialized) {
    // Render a loading screen while the app is initializing
    return <LoadingScreen />;
  }

  return children;
};

export default AuthProvider;
