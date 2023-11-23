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
import { Stack } from '@mui/material';
import { useParams } from 'next/navigation';
import { useCampaign, useCampaignLogs, useRemoveAudience } from 'src/api/campaigns';
import AudienceAccordionView from './audiences-accordion-view';
import CampaignInfoCard from './campaign-info-card';
import HeaderActions from './header-actions';
import CampaignReportTable from './campaign-report-table';

const CampaignsDetailsView = () => {
  const settings = useSettingsContext();
  const params = useParams();
  const { campaign } = useCampaign(params.id) || {};
  const { logs } = useCampaignLogs(params.id as unknown as number) || {};
  const deleteAudience = useRemoveAudience();

  const handleRemoveAudience = (audienceId: string) => {
    deleteAudience.mutate({
      audienceId,
      campaignId: params.id,
    });
  };

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
        <CampaignInfoCard campaign={campaign} />
        <JsonToTable json={campaign?.details} />
        <JsonToTable json={campaign?.transport} />
        <AudienceAccordionView
          audience={campaign?.audiences}
          handleRemoveAudience={handleRemoveAudience}
        />
        <JsonToTable json={logs?.rows} />
        {campaign?.transportId === 7 && logs?.rows && (
          <CampaignReportTable data={logs?.rows[0]?.details} />
        )}
      </Stack>
    </Container>
  );
};

export default CampaignsDetailsView;
