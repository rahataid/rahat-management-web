'use client';

import { useSettingsContext } from '@components/settings';
import { useBoolean } from '@hooks/use-boolean';
import { Container, Grid } from '@mui/material';
import { paths } from '@routes/paths';
import useProjectContract from '@services/contracts/useProject';
import useRahatDonor from '@services/contracts/useRahatDonor';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useProject } from 'src/api/project';
import useAppStore from 'src/store/app';
import useProjectStore from 'src/store/projects';
import CreateTokenModal from './create-token-modal';
import LockUnlockModal from './lock-unlock-modal';
import ProjectActions from './project-actions-card';
import ProjectAlerts from './project-alerts';
import { ProjectDetailsCard } from './project-details-card';
import ProjectDetailsChart from './project-details-chart';
import ProjectGallery from './project-gallery-view';
import ProjectStatsCard from './project-stats-card';

const _carouselsExample = [...Array(1)].map((_, index) => ({
  id: index,
  coverUrl: '/assets/images/about/vision.jpg',
}));
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
  const blockchainNetworkData = useAppStore((state) => state.blockchain);

  const { getProjectChainData, acceptToken, lockProject, unLockProject } = useProjectContract();
  const { sendTokenToProject } = useRahatDonor();

  const handleChainData = useCallback(async () => {
    const data = await getProjectChainData(params.address);
    setChainData(data);
  }, [getProjectChainData, params.address, setChainData]);

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
    {
      title: 'Approve Project',
      onClick: createTokenModal.onTrue,
      icon: 'mdi:approve',
      show: !chainData.isApproved,
    },
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
  ];

  const handleCreateToken = async (token: string) => {
    const sent = await sendTokenToProject(token);
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
    if (!chainData?.tokenAllowance) throw new Error('Token Allowance should not be empty');
    const accpeted = await acceptToken(chainData?.tokenAllowance?.toString() || '');
    console.log('accpeted', accpeted);
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
          <ProjectGallery data={_carouselsExample} title={project.name} />
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
            vendorsCount={project._count?.vendors}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <ProjectStatsCard
            totalBeneficiaries={project._count?.beneficiaries}
            distributedTokens={0}
            balance={chainData.balance}
            tokenName={blockchainNetworkData?.nativeCurrency.name}
            onCreateToken={createTokenModal.onTrue}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
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
        </Grid>
      </Grid>
    </Container>
  );
}
