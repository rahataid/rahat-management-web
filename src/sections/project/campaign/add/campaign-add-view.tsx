'use client';

import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { paths } from '@routes/paths';
import { useParams } from 'next/navigation';
import CampaignForm from './campaign-new-add-form';

const CampaignAddView = () => {
  const { address } = useParams();
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Campaign: Add"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Campaign', href: paths.dashboard.general.campaigns.list },
          { name: 'Add' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        // action={
        //   <Button
        //     component={RouterLink}
        //     href={paths.dashboard.general.projects.campaigns(address)}
        //     variant="outlined"
        //     startIcon={<Iconify icon="ph:list" />}
        //     color="success"
        //   >
        //     All Campaigns
        //   </Button>
        // }
      />
      <CampaignForm />
    </Container>
  );
};

export default CampaignAddView;
