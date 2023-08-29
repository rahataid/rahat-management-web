'use client';

import { LoadingScreen } from '@components/loading-screen';
import { getToken, getUser, getWalletName } from '@utils/storage-available';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useRef } from 'react';
import useAppStore from 'src/store/app';
import useAuthStore from 'src/store/auths';

type Props = {
  children: React.ReactNode;
};

const localWalletName = getWalletName();
const token = getToken();
const user = getUser();
const AuthProvider = ({ children }: Props) => {
  const { isInitialized, walletName } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    isInitialized: state.isInitialized,
    walletName: state.walletName,
  }));
  console.log('user', user);
  const { setContracts, setBlockchain } = useAppStore((state) => ({
    blockchain: state.blockchain,
    contracts: state.contracts,
    setBlockchain: state.setBlockchain,
    setContracts: state.setContracts,
  }));
  const { isActive } = useWeb3React();
  const prevIsActive = useRef<boolean | undefined>(undefined);

  useEffect(() => {
    // if (prevIsActive.current !== isActive) {
    useAuthStore.setState({
      isAuthenticated: true,
      isInitialized: true,
      walletName,
    });
    // } else {
    //   useAuthStore.setState({
    //     isAuthenticated: false,
    //     isInitialized: true,
    //     walletName: '',
    //   });
    //   prevIsActive.current = isActive;
    // }
  }, [isActive, walletName]);

  useEffect(() => {
    setBlockchain();
    setContracts();
  }, [setBlockchain, setContracts]);

  // attempt to connect metamask eagerly on mount
  // useEffect(() => {
  //   metaMask.connectEagerly().catch(() => {
  //     console.debug('Failed to connect eagerly to metamask');
  //   });
  // }, []);

  if (!isInitialized && prevIsActive.current !== isActive) {
    // Render a loading screen while the app is initializing
    return <LoadingScreen />;
  }

  return children;
};
export default AuthProvider;
