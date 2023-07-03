import type { Web3ReactHooks } from '@web3-react/core';
import { useEffect, useState } from 'react';

import { MetaMask } from '@web3-react/metamask';
import { URLS } from '@web3/chains';
import { hooks, metaMask } from '../../connectors/metaMask';

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

const CHAIN_IDS = Object.keys(URLS).map(Number);

type MetamaskCardProps = {
  component: React.ComponentType<{
    connector: MetaMask;
    activeChainId: ReturnType<Web3ReactHooks['useChainId']>;
    chainIds?: ReturnType<Web3ReactHooks['useChainId']>[];
    isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
    isActive: ReturnType<Web3ReactHooks['useIsActive']>;
    error: Error | undefined;
    setError: (error: Error | undefined) => void;
    ENSNames: ReturnType<Web3ReactHooks['useENSNames']>;
    provider?: ReturnType<Web3ReactHooks['useProvider']>;
    accounts?: string[];
    title?: string;
    description?: string;
    walletAvatar?: string;
  }>;
};

export default function MetaMaskCard({
  component: Component,
  description,
  title,
  walletAvatar,
}: MetamaskCardProps): JSX.Element {
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  const [error, setError] = useState<Error | undefined>(undefined);

  // attempt to connect eagerly on mount
  useEffect(() => {
    metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask');
    });
  }, []);

  return (
    <Component
      connector={metaMask}
      activeChainId={chainId}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      provider={provider}
      ENSNames={ENSNames}
      title={title}
      description={description}
      walletAvatar={walletAvatar}
      chainIds={CHAIN_IDS}
    />
  );
}
