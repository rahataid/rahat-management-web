'use client';
import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Card, Container, Stack } from '@mui/material';
import { useParams } from '@routes/hook';
import { paths } from '@routes/paths';
import { useCampaignLogs } from 'src/api/campaigns';
import LogsCards from '../campaigns-sms-logs-card';
import CampaignsSMSLogsTable from '../campaigns-sms-logs-table';

export default function CampaignsSMSLogsView() {
  const settings = useSettingsContext();
  const params = useParams();
  const { logs } = useCampaignLogs(params.logId as unknown as number) || {};

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Text: Logs"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Text', href: paths.dashboard.general.campaigns.smsLogs },
          { name: 'Logs' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <Stack m={2}>
          <LogsCards data={logs?.rows} />
        </Stack>
        {/* <CampaignsLogsToolbar /> */}
        <CampaignsSMSLogsTable data={logs?.rows} />
      </Card>
    </Container>
  );
}
