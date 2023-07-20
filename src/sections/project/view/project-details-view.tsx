'use client';

import { useSettingsContext } from '@components/settings';
import { Container, Grid } from '@mui/material';
import { useTransactions } from 'src/api/transactions';
import ProjectActions from './project-actions-card';
import { ProjectDetailsCard } from './project-details-card';
import ProjectDetailsChart from './project-details-chart';
import ProjectStatsCard from './project-stats-card';

// const _carouselsExample = [...Array(20)].map((_, index) => ({
//   id: project.id,
//   title: project.title,
//   coverUrl: project.image,
//   description: '',
// }));

export default function ProjectDetailsView() {
  const settings = useSettingsContext();
  const { transactionStats } = useTransactions();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={8}>
          {/* <CarouselBasic4 data={_carouselsExample.slice(0, 4)} /> */}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ProjectActions />
          <ProjectDetailsCard />
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
