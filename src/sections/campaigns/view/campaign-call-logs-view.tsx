'use client';
import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Card, CardHeader, Container, Stack } from '@mui/material';
import { useParams } from '@routes/hook';
import { paths } from '@routes/paths';
import { useCampaign, useCampaignLogs } from 'src/api/campaigns';
import CampaignsCallLogsTable from '../campaigns-call-logs-table';
import LogsCards from '../logs-card';
import CampaignInfoCard from './campaign-info-card';
import HeaderActions from './header-actions';

export default function CampaignsCallLogsView() {
  const settings = useSettingsContext();
  const params = useParams();
  const { campaign } = useCampaign(params.id) || {};
  const { logs } = useCampaignLogs(params.id as unknown as number) || {};
  const callLogsList: any = logs?.rows?.[0]?.details;

  const callLogsCardDetail = [
    {
      icon: 'material-symbols:call',
      total: callLogsList?.length,
      subTitle: 'Total IVR Sent',
    },
    {
      icon: 'material-symbols:call',
      total: logs?.rows?.[0]?.totalSuccessfulAnswer,
      subTitle: 'Successful IVR',
    },
    {
      icon: 'material-symbols:call',
      total: logs?.rows?.[0]?.totalFailure,
      subTitle: 'Failed IVR',
    },
  ];

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
        action={<HeaderActions campaign={campaign} />}
      />

      <CampaignInfoCard campaign={campaign} />
      <Card>
        <CardHeader title="All Logs" />
        <Stack m={2}>
          <LogsCards data={callLogsCardDetail} />
        </Stack>
        {/* <CampaignsLogsToolbar /> */}
        <CampaignsCallLogsTable data={logs?.rows?.[0]?.details} />
      </Card>
    </Container>
  );
}
