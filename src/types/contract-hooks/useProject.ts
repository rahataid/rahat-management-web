import { Contract, ContractTransactionResponse, InterfaceAbi } from 'ethers';

export type IProjectChainData = {
  balance: number | undefined;
  tokenAllowance: number | undefined;
  isLocked: boolean | undefined;
  isApproved: boolean | undefined;
};

export type IBeneficiaryChainData = {
  isBeneficiary: boolean | null;
  balance: number;
  allowance: number;
};

export interface ProjectContract {
  projectContract: Contract | null;
  abi: InterfaceAbi | null;
  getProjectBalance: (contractAddress: string) => Promise<number>;
  communityContract: Contract | null;
  isProjectLocked: () => Promise<boolean>;
  isProjectApproved: (contractAddress: string) => Promise<boolean>;
  getProjectChainData: (contractAddress: string) => Promise<IProjectChainData>;
  approveProject: (contractAddress: string) => Promise<void>;
  lockProject: (contractAddress: string) => Promise<void>;
  unLockProject: (contractAddress: string) => Promise<void>;
  acceptToken: (amount: string) => Promise<ContractTransactionResponse | void>;
  getTokenAllowance: () => Promise<number | undefined>;
  getVendorBalance: (walletAddress: string) => Promise<number | undefined>;
  getVendorAllowance: (vendorAddress: string) => Promise<number | undefined>;
  checkActiveVendor: (address: string) => Promise<boolean>;
  activateVendor: (address: string) => Promise<void>;
  sendTokensToVendor: (vendorAddress: string, amount: string) => Promise<void>;
  pendingVendorAllowance: (vendorAddress: string) => Promise<number | undefined>;
  acceptTokensByVendors: (numberOfTokens: string) => Promise<void>;
  checkActiveBeneficiary: (address: string) => Promise<boolean>;
  activateBeneficiary: (address: string) => Promise<Boolean>;
  assignClaimsToBeneficiaries: (
    walletAddress: string,
    amount: string
  ) => Promise<ContractTransactionResponse>;
  beneficiaryBalance: (walletAddress: string) => Promise<number | undefined>;
  getBeneficiaryChainData: (walletAddress: string) => Promise<IBeneficiaryChainData>;
  beneficiaryCounts: () => Promise<number | undefined>;
}
