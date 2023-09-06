'use client';

import { LoadingScreen } from '@components/loading-screen';
import { getToken, getUser } from '@utils/storage-available';
import { metaMask } from '@web3/connectors/metaMask';
import { useEffect } from 'react';
import useAppStore from 'src/store/app';
import useAuthStore from 'src/store/auths';
import { Role } from 'src/types/user';

type Props = {
  children: React.ReactNode;
};

const token = getToken();
const user = getUser();
const AuthProvider = ({ children }: Props) => {
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const { setContracts, setBlockchain } = useAppStore((state) => ({
    blockchain: state.blockchain,
    contracts: state.contracts,
    setBlockchain: state.setBlockchain,
    setContracts: state.setContracts,
  }));

  useEffect(() => {
    if (token) {
      useAuthStore.setState({
        isAuthenticated: true,
        isInitialized: true,
        user,
        role: {
          isAdmin: user?.roles.includes(Role.ADMIN),
          isUser: user?.roles.includes(Role.USER),
        },
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
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default AuthProvider;
