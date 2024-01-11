'use client';

import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { paths } from '@routes/paths';
import { useParams } from 'next/navigation';
import { useCampaign } from 'src/api/campaigns';
import HeaderActions from '../view/header-actions';
import CampaignEditForm from './campaign-new-edit-form';

const CampaignEditView = () => {
  const settings = useSettingsContext();
  const query = useParams();
  const { campaign } = useCampaign(query?.id as unknown as string);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Campaign: Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          // { name: 'Campaign', href: paths.dashboard.general.campaigns.list },
          { name: 'Edit' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={<HeaderActions />}
      />
      <CampaignEditForm currentCampaign={campaign} />
    </Container>
  );
};

export default CampaignEditView;
