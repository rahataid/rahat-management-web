import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Container, Grid, Stack } from '@mui/material';
import { paths } from '@routes/paths';

import BasicInfoCard from './basic-info-card';
import VendorsCards from './transaction-info-card';
import TransactionTable from './transaction-list-card';

const VendorView = () => {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Vendors: Details"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Details' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Stack direction="column" spacing={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <VendorsCards />
          </Grid>
          <Grid item xs={12} md={4}>
            <BasicInfoCard />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TransactionTable />
          </Grid>
          <Grid item xs={12} md={6}>
            <BasicInfoCard />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default VendorView;
