'use client';
import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Card, Container, Stack } from '@mui/material';
import { useParams } from '@routes/hook';
import { paths } from '@routes/paths';
import { useCampaignLogs } from 'src/api/campaigns';
import LogsCards from '../campaigns-call-logs-card';
import CampaignsCallLogsTable from '../campaigns-call-logs-table';

export default function CampaignsCallLogsView() {
  const settings = useSettingsContext();
  const params = useParams();
  const { logs } = useCampaignLogs(params.logId as unknown as number) || {};
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Voice: Logs"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Voice', href: paths.dashboard.general.campaigns.callLogs },
          { name: 'Logs' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <Stack m={2}>
          <LogsCards data={logs?.rows?.[0]?.details} />
        </Stack>
        {/* <CampaignsLogsToolbar /> */}
        <CampaignsCallLogsTable data={logs?.rows?.[0]?.details} />
      </Card>
    </Container>
  );
}
