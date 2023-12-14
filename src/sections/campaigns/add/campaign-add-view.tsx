'use client';

import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Button, Container } from '@mui/material';
import { RouterLink } from '@routes/components';
import { paths } from '@routes/paths';
import Iconify from 'src/components/iconify';
import CampaignForm from './campaign-new-add-form';

const CampaignAddView = () => {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Campaign: Add"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          // { name: 'Campaign', href: paths.dashboard.general.campaigns.list },
          { name: 'Add' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.general.campaigns.list}
            variant="outlined"
            startIcon={<Iconify icon="ph:list" />}
            color="success"
          >
            All Campaigns
          </Button>
        }
      />
      <CampaignForm />
    </Container>
  );
};

export default CampaignAddView;
