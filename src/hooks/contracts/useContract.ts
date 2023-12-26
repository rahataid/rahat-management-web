import { WebSocketProvider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Contract, ContractRunner, InterfaceAbi, JsonRpcProvider } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import useAppStore from 'src/store/app';

interface UseContractOptions {
  isWebsocket?: boolean;
  contractAddress?: string;
}

type UseContractReturn = [Contract | null, InterfaceAbi | null];

type UseContract = (contractName: string, options?: UseContractOptions) => UseContractReturn;

const useContract: UseContract = (contractName, options = {}) => {
  const [contract, setContract] = useState<Contract | null>(null);
  const { provider, isActive: isWalletActive } = useWeb3React();
  const { contracts, networks } = useAppStore((state) => ({
    contracts: state.contracts,
    networks: state.blockchain,
  }));

  const contractInstance = useMemo(() => {
    if (contracts && contractName) {
      if (options?.isWebsocket) {
        const websocketProvider = new WebSocketProvider(
          networks?.chainWebSocket as string
        ) as unknown as ContractRunner;
        return new Contract(
          (options?.contractAddress || contracts[contractName].address) as string,
          contracts[contractName].abi,
          websocketProvider
        );
      }
      return new Contract(
        options?.contractAddress || contracts[contractName].address,
        contracts[contractName].abi,
        isWalletActive
          ? (provider?.getSigner() as unknown as ContractRunner)
          : new JsonRpcProvider(networks?.rpcUrls[0] as string)
      );
    }
    return null;
  }, [
    contracts,
    contractName,
    options?.isWebsocket,
    options?.contractAddress,
    isWalletActive,
    provider,
    networks?.rpcUrls,
    networks?.chainWebSocket,
  ]);

  useEffect(() => {
    setContract(contractInstance);
  }, [contractInstance]);

  return [contract, contracts?.[contractName]?.abi || null];
};

export default useContract;
