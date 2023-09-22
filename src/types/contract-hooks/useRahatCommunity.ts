import { Contract, ContractTransactionResponse } from 'ethers';

export interface CommunityHooks {
  contract: Contract | null;
  vendorRoles: () => Promise<string>;
  checkIfBeneficiary: (walletAddress: string) => Promise<boolean | undefined>;
  addBeneficiaryToCommunity: (walletAddress: string) => Promise<void>;
  communityName: () => Promise<string>;
  addVendorToCommunity: (vendorAddress: string) => Promise<void | Error>;
  addAdminToCommunity: (adminAddress: string) => Promise<ContractTransactionResponse | Error>;
}
