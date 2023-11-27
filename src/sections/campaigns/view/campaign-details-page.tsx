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
import { Stack } from '@mui/material';
import { useParams } from 'next/navigation';
import { useCampaign, useCampaignLogs } from 'src/api/campaigns';
import CampaignBasicReport from './campaign-basic-report';
import CampaignInfoCard from './campaign-info-card';
import CampaignsLogsDetailsView from './campaign-logs-view';
import HeaderActions from './header-actions';

const CampaignsDetailsView = () => {
  const settings = useSettingsContext();
  const params = useParams();
  const { campaign } = useCampaign(params.id) || {};
  const { logs } = useCampaignLogs(params.id as unknown as number) || {};
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Campaigns: Details"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Details' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={<HeaderActions campaign={campaign} />}
      />

      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <CampaignInfoCard campaign={campaign} />
          <CampaignBasicReport logs={logs?.rows} />
        </Stack>
        <CampaignsLogsDetailsView />
        {/* <JsonToTable json={campaign?.transport} /> */}
      </Stack>
    </Container>
  );
};

export default CampaignsDetailsView;
