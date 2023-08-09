import { CONTRACTS } from '@config';
import useContract from '@hooks/contracts/useContract';
import { useErrorHandler } from '@hooks/user-error-handler';
import { useCallback, useMemo } from 'react';
import { ProjectContract } from 'src/types/contract-hooks/useProject';

const useProjectContract = (): ProjectContract => {
  const { handleContractError } = useErrorHandler();
  const [projectContract, abi] = useContract(CONTRACTS.CVAPROJECT);
  const [tokenContract] = useContract(CONTRACTS.RAHATTOKEN);
  const [donorContract] = useContract(CONTRACTS.DONOR);
  const [communityContract] = useContract(CONTRACTS.COMMUNITY);

  const getProjectBalance = useCallback(
    async (contractAddress: string): Promise<number> => {
      if (!tokenContract) {
        return 0;
      }
      const balance = await tokenContract.balanceOf(contractAddress);
      return balance.toString();
    },
    [tokenContract]
  );

  const isProjectLocked = useCallback(async (): Promise<boolean> => {
    if (!projectContract) {
      return false;
    }
    return projectContract.isLocked();
  }, [projectContract]);

  const isProjectApproved = useCallback(
    async (contractAddress: string): Promise<boolean> => {
      if (!communityContract) {
        return false;
      }
      return communityContract.isProject(contractAddress);
    },
    [communityContract]
  );

  const getTokenAllowance = useCallback(async (): Promise<number | undefined> => {
    if (!tokenContract || !donorContract || !projectContract) {
      return undefined;
    }
    const allowance = await tokenContract.allowance(donorContract.target, projectContract.target);
    return allowance.toString();
  }, [tokenContract, donorContract, projectContract]);

  const getProjectChainData = useCallback(
    async (contractAddress: string) => {
      const [balance, tokenAllowance, isLocked, isApproved] = await Promise.all([
        getProjectBalance(contractAddress),
        getTokenAllowance(),
        isProjectLocked(),
        isProjectApproved(contractAddress),
      ]);
      return {
        balance,
        tokenAllowance,
        isLocked,
        isApproved,
      };
    },
    [getProjectBalance, isProjectApproved, getTokenAllowance, isProjectLocked]
  );

  const approveProject = useCallback(
    async (contractAddress: string): Promise<void> => {
      if (!communityContract) {
        return;
      }
      await communityContract.approveProject(contractAddress).catch(handleContractError);
    },
    [communityContract, handleContractError]
  );

  const lockProject = useCallback(
    async (contractAddress: string): Promise<void> => {
      if (!donorContract || !projectContract) {
        return;
      }
      await donorContract.lockProject(contractAddress).catch(handleContractError);
    },
    [donorContract, projectContract, handleContractError]
  );

  const unLockProject = useCallback(
    async (contractAddress: string): Promise<void> => {
      if (!donorContract || !projectContract) {
        return;
      }
      await donorContract.unlockProject(contractAddress).catch(handleContractError);
    },
    [donorContract, projectContract, handleContractError]
  );

  const acceptToken = useCallback(
    async (amount: string): Promise<void> => {
      if (!projectContract || !donorContract) {
        return;
      }
      await projectContract.acceptToken(donorContract.target, amount).catch(handleContractError);
    },
    [projectContract, donorContract, handleContractError]
  );

  const getVendorBalance = useCallback(
    async (walletAddress: string): Promise<number | undefined> => {
      if (!tokenContract) {
        return undefined;
      }
      const balance = await tokenContract.balanceOf(walletAddress);
      return balance?.toNumber();
    },
    [tokenContract]
  );

  const getVendorAllowance = useCallback(
    async (vendorAddress: string): Promise<number | undefined> => {
      if (!projectContract) {
        return undefined;
      }
      const allowance = await projectContract.vendorAllowance(vendorAddress);
      return allowance?.toNumber();
    },
    [projectContract]
  );

  const checkActiveVendor = useCallback(
    async (address: string): Promise<boolean> => {
      if (!communityContract) {
        return false;
      }
      const role = await communityContract.VENDOR_ROLE();
      return communityContract.hasRole(role, address).catch(handleContractError);
    },
    [communityContract, handleContractError]
  );

  const activateVendor = useCallback(
    async (address: string): Promise<void> => {
      if (!communityContract) {
        return;
      }
      const role = await communityContract.VENDOR_ROLE();
      await communityContract.grantRoleWithEth(role, address).catch(handleContractError);
    },
    [communityContract, handleContractError]
  );

  const sendTokensToVendor = useCallback(
    async (vendorAddress: string, amount: string): Promise<void> => {
      if (!projectContract) {
        return;
      }
      await projectContract
        .createAllowanceToVendor(vendorAddress, amount)
        .catch(handleContractError);
    },
    [projectContract, handleContractError]
  );

  const pendingWheelsToAccept = useCallback(
    async (vendorAddress: string): Promise<number | undefined> => {
      if (!projectContract) {
        return undefined;
      }
      const pending = await projectContract.vendorAllowancePending(vendorAddress);
      return pending?.toNumber();
    },
    [projectContract]
  );

  const acceptTokensByVendors = useCallback(
    async (numberOfTokens: string): Promise<void> => {
      if (!projectContract) {
        return;
      }
      await projectContract
        .acceptAllowanceByVendor(numberOfTokens.toString())
        .catch(handleContractError);
    },
    [projectContract, handleContractError]
  );

  const checkActiveBeneficiary = useCallback(
    async (address: string): Promise<boolean> => {
      if (!communityContract) {
        return false;
      }
      return communityContract.isBeneficiary(address).catch(handleContractError);
    },
    [communityContract, handleContractError]
  );

  const activateBeneficiary = useCallback(
    async (address: string): Promise<void> => {
      if (!communityContract) {
        return;
      }
      await communityContract.addBeneficiary(address).catch(handleContractError);
    },
    [communityContract, handleContractError]
  );

  const assignClaimsToBeneficiaries = useCallback(
    async (walletAddress: string, amount: string): Promise<void> => {
      if (!projectContract) {
        return;
      }
      await projectContract
        .assignClaims(walletAddress, amount?.toString())
        .catch(handleContractError);
    },
    [projectContract, handleContractError]
  );

  const beneficiaryBalance = useCallback(
    async (walletAddress: string): Promise<number | undefined> => {
      if (!projectContract) {
        return undefined;
      }
      const balance = await projectContract.beneficiaryClaims(walletAddress);
      return balance?.toNumber();
    },
    [projectContract]
  );

  const beneficiaryCounts = useCallback(async (): Promise<number | undefined> => {
    if (!projectContract) {
      return undefined;
    }
    return projectContract.beneficiaryCount();
  }, [projectContract]);

  return useMemo(
    () => ({
      projectContract,
      abi,
      getProjectBalance,
      communityContract,
      isProjectLocked,
      isProjectApproved,
      getProjectChainData,
      approveProject,
      lockProject,
      unLockProject,
      acceptToken,
      getTokenAllowance,
      getVendorBalance,
      getVendorAllowance,
      checkActiveVendor,
      activateVendor,
      sendTokensToVendor,
      pendingWheelsToAccept,
      acceptTokensByVendors,
      checkActiveBeneficiary,
      activateBeneficiary,
      assignClaimsToBeneficiaries,
      beneficiaryBalance,
      beneficiaryCounts,
    }),
    [
      abi,
      projectContract,
      communityContract,
      getProjectBalance,
      isProjectLocked,
      isProjectApproved,
      getProjectChainData,
      approveProject,
      lockProject,
      unLockProject,
      acceptToken,
      getTokenAllowance,
      getVendorBalance,
      getVendorAllowance,
      checkActiveVendor,
      activateVendor,
      sendTokensToVendor,
      pendingWheelsToAccept,
      acceptTokensByVendors,
      checkActiveBeneficiary,
      activateBeneficiary,
      assignClaimsToBeneficiaries,
      beneficiaryBalance,
      beneficiaryCounts,
    ]
  );
};

export default useProjectContract;
