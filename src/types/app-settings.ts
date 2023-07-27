import { AddEthereumChainParameter } from '@web3-react/types';

export type IAppSettingsContractsApiResponse = {
  CVAProject: string;
  RahatClaim: string;
  RahatCommunity: string;
  RahatDonor: string;
  RahatToken: string;
};

export type IAppSettingsNetworkApiResponse = {
  chainId: number;
  chainName: string;
  chainWebSocket: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  networkId: number;
  networkUrl: string;
};
export type IAppSettingsNetwork = AddEthereumChainParameter;
