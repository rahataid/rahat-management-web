import { Contract, ContractTransactionResponse } from 'ethers';

export interface UseRahatDonorReturn {
  donorContract: Contract | null;
  donorContractWS: Contract | null;
  rahatTokenContract: Contract | null;
  sendTokenToProject: (amount: string) => Promise<ContractTransactionResponse>;
  addAsOwner: (walletAddress: string) => Promise<void>;
  isOwner: (walletAddress: string) => Promise<boolean>;
}
