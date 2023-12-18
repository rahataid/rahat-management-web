'use client';
import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Card, Container, Stack } from '@mui/material';
import { useParams } from '@routes/hook';
import { paths } from '@routes/paths';
import { useCampaignLogs } from 'src/api/campaigns';
import CampaignsCallLogsTable from '../campaigns-call-logs-table';
import LogsCards from '../logs-card';

export default function CampaignsCallLogsView() {
  const settings = useSettingsContext();
  const params = useParams();
  const { logs } = useCampaignLogs(params.logId as unknown as number) || {};

  const callLogsList: any = logs?.rows?.[0]?.details;

  const successfulIVRList = callLogsList?.length
    ? callLogsList?.filter((log: any) => log.disposition === 'ANSWERED')
    : [];
  const failedIVRList: any = callLogsList?.length
    ? callLogsList.filter((log: any) => log.disposition !== 'ANSWERED')
    : [];

  const callLogsCardDetail = [
    {
      icon: 'material-symbols:call',
      total: callLogsList?.length,
      subTitle: 'Total IVR Sent',
    },
    {
      icon: 'material-symbols:call',
      total: successfulIVRList?.length,
      subTitle: 'Successful IVR',
    },
    {
      icon: 'material-symbols:call',
      total: failedIVRList?.length,
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
      />

      <Card>
        <Stack m={2}>
          <LogsCards data={callLogsCardDetail} />
        </Stack>
        {/* <CampaignsLogsToolbar /> */}
        <CampaignsCallLogsTable data={logs?.rows?.[0]?.details} />
      </Card>
    </Container>
  );
}
