'use client';
import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Card, Container, Stack } from '@mui/material';
import { paths } from '@routes/paths';
import LogsCards from '../campaigns-call-logs-card';
import CampaignsCallLogsTable from '../campaigns-call-logs-table';
import CampaignsLogsToolbar from '../campaigns-logs-toolbar';

type ILogsStats = {
  totalIVRSent: number;
  successfulIVR: number;
  failedIVR: number;
};

const logStats: ILogsStats = {
  totalIVRSent: 5,
  successfulIVR: 7,
  failedIVR: 9,
};
export default function CampaignsCallLogsView() {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Campaigns: Call Logs"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Call Logs' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <Stack m={2}>
          <LogsCards data={logStats} />
        </Stack>
        <CampaignsLogsToolbar />
        <CampaignsCallLogsTable />
      </Card>
    </Container>
  );
}
