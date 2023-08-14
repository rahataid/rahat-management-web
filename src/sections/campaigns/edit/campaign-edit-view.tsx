'use client';

import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { paths } from '@routes/paths';
import HeaderActions from '../view/header-actions';
import CampaignForm from './campaign-new-edit-form';

const CampaignEditView = () => {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Campaign: Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Campaign', href: paths.dashboard.general.campaigns.list },
          { name: 'Edit' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={<HeaderActions />}
      />
      <CampaignForm />
    </Container>
  );
};

export default CampaignEditView;
