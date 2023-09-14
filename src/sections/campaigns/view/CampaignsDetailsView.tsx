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

const CampaignsDetailsView = () => {
  const settings = useSettingsContext();
  const params = useParams();
  const { campaign } = useCampaign(params.id);
  console.log(campaign, 'campaign');
  const { logs } = useCampaignLogs(params.id as unknown as number);
  console.log(logs, 'logs');
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
        action={<HeaderActions />}
      />

      <Stack direction="column" spacing={2}>
        <CampaignInfoCard campaign={campaign} />
        <JsonToTable json={campaign.details} />
        <JsonToTable json={campaign.transport} />
        <AudienceAccordionView
          audience={campaign?.audiences}
          handleRemoveAudience={handleRemoveAudience}
        />
        <JsonToTable json={logs?.rows} />
      </Stack>
    </Container>
  );
};

export default CampaignsDetailsView;
