'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// _mock
// hooks
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// types
//
import { useSettingsContext } from '@components/settings';
import JsonToTable from '@components/table/json-table';
import { Stack, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useCampaign, useCampaignLogs } from 'src/api/campaigns';
import CampaignReportPhoneTable from './campaign-report-table';
import HeaderActions from './header-actions';

const CampaignsLogsDetailsView = () => {
  const settings = useSettingsContext();
  const params = useParams();
  const { campaign } = useCampaign(params.id) || {};
  const { logs } = useCampaignLogs(params.id as unknown as number) || {};
  console.log('logs', logs);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Campaigns: Communication Logs"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Campaign', href: paths.dashboard.general.campaigns.details(campaign?.id) },
          { name: 'Details' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={<HeaderActions campaign={campaign} />}
      />

      <Stack direction="column" spacing={2}>
        {campaign?.transportId === 7 && logs?.rows && logs.rows[0]?.details ? (
          <CampaignReportPhoneTable data={logs.rows[0].details} />
        ) : logs?.rows && logs.rows.length > 0 ? (
          <JsonToTable json={logs.rows} />
        ) : (
          <>
            <Typography variant="h4">No Logs Found for this campaign</Typography>
            <Typography variant="caption">PS: Campaign should be triggerd to show logs</Typography>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default CampaignsLogsDetailsView;
