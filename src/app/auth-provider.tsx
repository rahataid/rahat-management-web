'use client';

import { LoadingScreen } from '@components/loading-screen';
import { isValidToken } from '@utils/session';
import { getUser } from '@utils/storage-available';
import { metaMask } from '@web3/connectors/metaMask';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import useAppStore from 'src/store/app';
import useAuthStore from 'src/store/auths';

type Props = {
  children: React.ReactNode;
};

const user = getUser();
const AuthProvider = ({ children }: Props) => {
  const { isInitialized } = useAuthStore((state) => ({
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

  useEffect(() => {
    if (!isEmpty(user) && isValidToken(user?.refresh_token)) {
      useAuthStore.setState({
        isAuthenticated: true,
        isInitialized: true,
        // walletName: user?.wallet_name,
      });
    } else {
      useAuthStore.setState({
        isAuthenticated: false,
        isInitialized: true,
        walletName: '',
      });
    }
  }, []);

  useEffect(() => {
    setBlockchain();
    setContracts();
  }, [setBlockchain, setContracts]);

  // attempt to connect metamask eagerly on mount
  useEffect(() => {
    metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask');
    });
  }, []);

  if (!isInitialized) {
    // Render a loading screen while the app is initializing
    return <LoadingScreen />;
  }

  return children;
};
export default AuthProvider;
