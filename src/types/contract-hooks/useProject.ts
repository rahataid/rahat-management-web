import { Contract, InterfaceAbi } from 'ethers';

export type IProjectChainData = {
  balance: number | undefined;
  tokenAllowance: number | undefined;
  isLocked: boolean | undefined;
  isApproved: boolean | undefined;
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
  acceptToken: (amount: string) => Promise<void>;
  getTokenAllowance: () => Promise<number | undefined>;
  getVendorBalance: (walletAddress: string) => Promise<number | undefined>;
  getVendorAllowance: (vendorAddress: string) => Promise<number | undefined>;
  checkActiveVendor: (address: string) => Promise<boolean>;
  activateVendor: (address: string) => Promise<void>;
  sendTokensToVendor: (vendorAddress: string, amount: string) => Promise<void>;
  pendingWheelsToAccept: (vendorAddress: string) => Promise<number | undefined>;
  acceptTokensByVendors: (numberOfTokens: string) => Promise<void>;
  checkActiveBeneficiary: (address: string) => Promise<boolean>;
  activateBeneficiary: (address: string) => Promise<void>;
  assignClaimsToBeneficiaries: (walletAddress: string, amount: string) => Promise<void>;
  beneficiaryBalance: (walletAddress: string) => Promise<number | undefined>;
  beneficiaryCounts: () => Promise<number | undefined>;
}
