'use client';

import { useSettingsContext } from '@components/settings';
import { useBoolean } from '@hooks/use-boolean';
import { Container, Grid } from '@mui/material';
import { paths } from '@routes/paths';
import { useParams, useRouter } from 'next/navigation';
import { useProject } from 'src/api/project';
import { useTransactions } from 'src/api/transactions';
import CreateTokenModal from './create-token-modal';
import ProjectActions from './project-actions-card';
import { ProjectDetailsCard } from './project-details-card';
import ProjectDetailsChart from './project-details-chart';
import ProjectGallery from './project-gallery-view';
import ProjectStatsCard from './project-stats-card';

const _carouselsExample = [...Array(20)].map((_, index) => ({
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
  const { transactionStats } = useTransactions();
  const router = useRouter();
  const params = useParams();
  const { project } = useProject(params.address);
  console.log({project})
  const createTokenModal = useBoolean();

  const rightActionOptions: MenuOptions = [
    {
      title: 'Create Token',
      onClick: () => createTokenModal.onTrue(),
      icon: 'tabler:edit',
      show: true,
    },
  ];
  const leftActionOptions: MenuOptions = [
    {
      title: 'Beneficiaries',
      onClick: () => {
        router.push(paths.dashboard.general.projects.beneficiaries(params.address as unknown as string));
      },
      show: true,
    },
    {
      title: 'Vendors',
      onClick: () => {},
      show: true,
    },
  ];

  const createToken = (data: { token: string }) => {
    console.log('TokenCvreate', data);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CreateTokenModal
        open={createTokenModal.value}
        onClose={createTokenModal.onFalse}
        onOk={createToken}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={8}>
          <ProjectGallery data={_carouselsExample} title={project.name} />
        </Grid>
        <Grid item xs={12} md={6} lg={4} spacing={2}>
          <ProjectActions leftOptions={leftActionOptions} rightOptions={rightActionOptions} />
          <ProjectDetailsCard
            startDate={project.startDate}
            endDate={project.endDate}
            description={project.description}
            location={project.contractAddress}
            projectManager={project.projectManager}
            vendorsCount={project._count?.vendors}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <ProjectStatsCard data={transactionStats} />
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
