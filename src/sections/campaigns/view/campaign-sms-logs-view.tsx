'use client';
import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Card, Container, Stack } from '@mui/material';
import { paths } from '@routes/paths';
import CampaignsLogsToolbar from '../campaigns-logs-toolbar';
import LogsCards from '../campaigns-sms-logs-card';
import CampaignsSMSLogsTable from '../campaigns-sms-logs-table';

type ILogsStats = {
  totalSMSSent: number;
  bankedBeneficiaries: number;
  unbankedBeneficiaries: number;
};

const logStats: ILogsStats = {
  totalSMSSent: 5,
  bankedBeneficiaries: 7,
  unbankedBeneficiaries: 9,
};
export default function CampaignsSMSLogsView() {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Campaigns: SMS Logs"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'SMS Logs' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <Stack m={2}>
          <LogsCards data={logStats} />
        </Stack>
        <CampaignsLogsToolbar />
        <CampaignsSMSLogsTable />
      </Card>
    </Container>
  );
}
