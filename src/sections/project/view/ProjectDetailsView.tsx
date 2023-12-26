'use client';

import { useSettingsContext } from '@components/settings';
import { useBoolean } from '@hooks/use-boolean';
import { Container, Grid } from '@mui/material';
import { paths } from '@routes/paths';
import useProjectContract from '@services/contracts/useProject';
import useRahatDonor from '@services/contracts/useRahatDonor';
import { useRahatToken } from '@services/contracts/useRahatToken';
import { interruptChainActions } from '@utils/chainActionInterrupt';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useProject } from 'src/api/project';
import { useProjectBasedReport } from 'src/api/reports';
import { useVendors } from 'src/api/vendors';
import useAppStore from 'src/store/app';
import useProjectStore from 'src/store/projects';
import CreateTokenModal from './create-token-modal';
import LockUnlockModal from './lock-unlock-modal';
import ProjectActions from './project-actions-card';
import ProjectAlerts from './project-alerts';
import { ProjectDetailsCard } from './project-details-card';
import ProjectGallery from './project-gallery-view';
import Piechart from './project-pie-chart';
import ProjectStatsCard from './project-stats-card';

// const _carouselsExample = [...Array(1)].map((_, index) => ({
//   id: index,
//   coverUrl: '/assets/images/about/vision.jpg',
// }));
type MenuOptions = {
  title: string;
  onClick: () => void;
  show: boolean;
  icon?: string;
}[];

export default function ProjectDetailsView() {
  const settings = useSettingsContext();
  const router = useRouter();
  const params = useParams();
  const { project } = useProject(params.address);
  const createTokenModal = useBoolean();
  const lockProjectModal = useBoolean();
  const unlockProjectModal = useBoolean();

  const { chainData, setChainData } = useProjectStore((state) => ({
    chainData: state.chainData,
    setChainData: state.setChainData,
  }));

  const { vendors } = useVendors();
  const blockchainNetworkData = useAppStore((state) => state.blockchain);
  const {
    getProjectChainData,
    acceptToken,
    lockProject,
    unLockProject,
    getVendorBalance,
    projectContractWS: ProjectContractWS,
  } = useProjectContract();
  const { sendTokenToProject, donorContractWS: DonorContractWS } = useRahatDonor();
  const { contractWS: RahatTokenWS } = useRahatToken();

  const handleChainData = useCallback(async () => {
    const data = await getProjectChainData(params.address);
    setChainData(data);
  }, [getProjectChainData, params.address, setChainData]);

  // TODO: this is NOT the optimal solution, should use a different approach
  const getVendorDisbursedBalance = useCallback(async () => {
    const vendorAddresses = vendors.map((vendor) => vendor.walletAddress);
    const balances = await Promise.all(
      vendorAddresses.map((address) => getVendorBalance(address as string))
    );
    const totalBalance = balances.map(Number).reduce((acc, balance) => acc + balance, 0);

    setChainData({
      ...chainData,
      distributed: totalBalance,
    });
  }, [chainData, getVendorBalance, setChainData, vendors]);

  useEffect(() => {
    if (chainData?.distributed !== undefined) return;
    getVendorDisbursedBalance();
  }, [chainData?.distributed, getVendorDisbursedBalance]);

  useEffect(() => {
    RahatTokenWS?.on('Approval', handleChainData);
    RahatTokenWS?.on('Transfer', handleChainData);
    DonorContractWS?.on('TokenMintedAndApproved', handleChainData);
    DonorContractWS?.on('TokenCreated', handleChainData);
    ProjectContractWS?.on('ProjectLocked', handleChainData);
    ProjectContractWS?.on('ProjectUnlocked', handleChainData);
    return () => {
      RahatTokenWS?.removeAllListeners();
      DonorContractWS?.removeAllListeners();
      ProjectContractWS?.removeAllListeners();
    };
  }, [project, handleChainData, RahatTokenWS, DonorContractWS, ProjectContractWS]);

  useEffect(() => {
    handleChainData();
  }, [handleChainData, createTokenModal.value, lockProjectModal.value, unlockProjectModal.value]);

  const rightActionOptions: MenuOptions = [
    {
      title: 'Create Token',
      onClick: createTokenModal.onTrue,
      icon: 'ic:baseline-generating-tokens',
      show: true,
    },
    // {
    //   title: 'Approve Project',
    //   onClick: createTokenModal.onTrue,
    //   icon: 'mdi:approve',
    //   show: !chainData.isApproved,
    // },
    {
      title: 'Lock Project',
      onClick: lockProjectModal.onTrue,
      icon: 'solar:lock-outline',
      show: !chainData.isLocked,
    },
    {
      title: 'Unlock Project',
      onClick: unlockProjectModal.onTrue,
      icon: 'clarity:unlock-line',
      show: Boolean(chainData.isLocked),
    },
    {
      title: 'Edit Project',
      onClick: () =>
        router.push(paths.dashboard.general.projects.edit(params.address as unknown as string)),
      icon: 'tabler:edit',
      show: true,
    },
  ];
  const leftActionOptions: MenuOptions = [
    {
      title: 'Beneficiaries',
      onClick: () => {
        router.push(
          paths.dashboard.general.projects.beneficiaries(params.address as unknown as string)
        );
      },
      show: true,
    },
    {
      title: 'Vendors',
      onClick: () => {
        router.push(paths.dashboard.general.projects.vendors(params.address as unknown as string));
      },
      show: true,
    },
    {
      title: 'Campaigns',
      onClick: () => {
        router.push(
          paths.dashboard.general.projects.campaigns(params.address as unknown as string)
        );
      },
      show: true,
    },
  ];

  const handleCreateToken = async (token: string) => {
    // const sent = await sendTokenToProject(token);
    // TODO:Interrupted chain actions temporarily disabled
    const sent = await interruptChainActions(sendTokenToProject, token);
    if (sent) {
      createTokenModal.onFalse();
    }
  };

  const handleLockProject = async () => {
    const locked = await lockProject(project.contractAddress);
    if (locked) lockProjectModal.onFalse();
  };
  const handleUnlockProject = async () => {
    const unlocked = await unLockProject(project.contractAddress);
    if (unlocked) unlockProjectModal.onFalse();
  };

  const handleTokenAccept = async () => {
    if (!chainData?.balance) throw new Error('Token Allowance should not be empty');
    const accpeted = await acceptToken(chainData?.balance?.toString() || '');
  };

  const lockProjectProp = {
    title: 'Lock Project',
    description: 'Are you sure you want to lock this project?',
    okText: 'Lock',
    open: lockProjectModal.value,
    onClose: lockProjectModal.onFalse,
    onOk: handleLockProject,
  };

  const unlockProjectProp = {
    title: 'Unlock Project',
    description: 'Are you sure you want to unlock this project?',
    okText: 'Unlock',
    open: unlockProjectModal.value,
    onClose: unlockProjectModal.onFalse,
    onOk: handleUnlockProject,
  };

  const { genderData, internetAccessData, phoneOwnershipData, bankStatusData } =
    useProjectBasedReport(params.address);

  const carouselsExample = [...Array(1)].map((_, index) => ({
    id: index,
    coverUrl: `${project?.coverImage}`,
  }));

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CreateTokenModal
        open={createTokenModal.value}
        onClose={createTokenModal.onFalse}
        onOk={handleCreateToken}
      />
      <LockUnlockModal {...(!chainData.isLocked ? lockProjectProp : unlockProjectProp)} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={8}>
          <ProjectGallery data={carouselsExample} title={project.name} />
        </Grid>
        <Grid item xs={12} md={6} lg={4} spacing={2}>
          <ProjectActions leftOptions={leftActionOptions} rightOptions={rightActionOptions} />
          <ProjectAlerts
            isApproved={chainData.isApproved}
            tokenName={blockchainNetworkData?.nativeCurrency.name}
            tokenAllowance={chainData.tokenAllowance}
            onTokenAccept={handleTokenAccept}
          />
          <ProjectDetailsCard
            isLocked={Boolean(chainData.isLocked)}
            startDate={project.startDate}
            endDate={project.endDate}
            description={project.description}
            location={project.contractAddress}
            projectManager={project.projectManager}
            vendorsCount={vendors?.length || 0}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <ProjectStatsCard
            totalBeneficiaries={project._count?.beneficiaries}
            distributedTokens={chainData?.distributed}
            balance={chainData.balance}
            tokenName={blockchainNetworkData?.nativeCurrency.name}
            onCreateToken={createTokenModal.onTrue}
          />
        </Grid>
        {/* <Grid item xs={12} md={6} lg={8}>
          <ProjectDetailsChart
            title="Beneficiaries Per Distribution Point"
            subheader="this is sub heading"
            chart={{
              categories: [
                'Darchula',
                'Dadeldhura',
                'Argakhachi',
                'Morang',
                'Solukhumbu',
                'Manang',
              ],
              series: [
                {
                  type: 'Week',
                  data: [{ name: 'Amount', data: [100, 410, 350, 1510, 490, 620] }],
                },
                {
                  type: 'Month',
                  data: [{ name: 'Amount', data: [1480, 910, 690, 620, 490, 5100] }],
                },
                {
                  type: 'Year',
                  data: [{ name: 'Amount', data: [760, 420, 290, 410, 270, 1380] }],
                },
              ],
            }}
          />
        </Grid> */}
      </Grid>

      <Grid container mt={3} spacing={3}>
        <Grid item xs={12} md={3}>
          <Piechart
            title="Gender-wise Distribution"
            chart={{
              series: genderData,
              colors: ['#78C1F3', '#FEBBCC', '#FFD966', '#FF6969'],
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Piechart
            title="Banked or unbanked"
            chart={{
              series: bankStatusData,
              colors: ['#FF6969', '#FEBBCC', '#78C1F3', '#FFD966'],
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Piechart
            title="Access to internet"
            chart={{
              series: internetAccessData,
              colors: ['#FF6969', '#FEBBCC', '#FFD966', '#78C1F3'],
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Piechart
            title="Access to Phone"
            chart={{
              series: phoneOwnershipData,
              colors: ['#FF6969', '#FEBBCC', '#FFD966', '#78C1F3'],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
