'use client';
import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Card, CardHeader, Container, Stack } from '@mui/material';
import { useParams } from '@routes/hook';
import { paths } from '@routes/paths';
import { useCampaign, useCampaignLogs } from 'src/api/campaigns';
import CampaignsSMSLogsTable from '../campaigns-sms-logs-table';
import LogsCards from '../logs-card';
import CampaignInfoCard from './campaign-info-card';
import HeaderActions from './header-actions';

export default function CampaignsSMSLogsView() {
  const settings = useSettingsContext();
  const params = useParams();
  const { campaign } = useCampaign(params.id) || {};
  const { logs } = useCampaignLogs(params.id as unknown as number) || {};

  const smsLogsList: any = logs?.rows;

  const smsLogsCardDetail = [
    {
      icon: 'material-symbols:sms',
      total: smsLogsList?.length,
      subTitle: 'Total SMS Sent',
    },
    {
      icon: 'material-symbols:sms',
      total: 0,
      subTitle: 'Banked Beneficiaries',
    },
    {
      icon: 'material-symbols:sms',
      total: 0,
      subTitle: 'Unbanked Beneficiaries',
    },
  ];

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
        action={<HeaderActions campaign={campaign} />}
      />

      <CampaignInfoCard campaign={campaign} />
      <Card>
        <CardHeader title="All Logs" />
        <Stack m={2}>
          <LogsCards data={smsLogsCardDetail} />
        </Stack>
        {/* <CampaignsLogsToolbar /> */}
        <CampaignsSMSLogsTable data={logs?.rows} />
      </Card>
    </Container>
  );
}
