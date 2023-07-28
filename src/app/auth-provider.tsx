'use client';

import { LoadingScreen } from '@components/loading-screen';
import { getToken, getWalletName } from '@utils/storage-available';
import { useWeb3React } from '@web3-react/core';
import { metaMask } from '@web3/connectors/metaMask';
import { useEffect } from 'react';
import useAppStore from 'src/store/app';
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
  const { setContracts, setBlockchain } = useAppStore((state) => ({
    blockchain: state.blockchain,
    contracts: state.contracts,
    setBlockchain: state.setBlockchain,
    setContracts: state.setContracts,
  }));
  const { isActive } = useWeb3React();
  // console.log('isActive', isActive);

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
  }, [isActive]);

  useEffect(() => {
    setBlockchain();
    setContracts();
  }, [setBlockchain, setContracts]);

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
