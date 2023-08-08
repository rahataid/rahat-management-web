import { TransactionReceipt } from '@ethersproject/providers';
import { Contract } from 'ethers';

export interface UseRahatDonorReturn {
  donorContract: Contract | null;
  rahatTokenContract: Contract | null;
  sendTokenToProject: (amount: string) => Promise<TransactionReceipt>;
}
