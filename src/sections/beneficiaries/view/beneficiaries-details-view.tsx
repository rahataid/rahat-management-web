'use client';

import { useBeneficiary } from 'src/api/beneficiaries';
// mui
import Container from '@mui/material/Container';
// routes
import { paths } from '@routes/paths';
import { useParams } from 'src/routes/hook';
// components
import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { Card, Grid, Typography } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';

import BeneficiariesDetailsCard from './beneficiaries-details-card';
import BeneficiariesDetailsClaimsCard from './beneficiaries-details-claims-card';
import BeneficiaryDetailsTableView from './beneficiaries-details-table-view';

export default function BeneficiariesDetailsView() {
  const { uuid } = useParams();
  const { beneficiary } = useBeneficiary(uuid as string);
  console.log('beneficiary', beneficiary);
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Beneficiaries: Details"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Details' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Grid
        container
        spacing={2}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <Grid item xs={12} md={7}>
          <BeneficiariesDetailsCard data={beneficiary} />
        </Grid>
        <Grid item xs={12} md={5}>
          <BeneficiariesDetailsClaimsCard walletAddress={beneficiary?.walletAddress} uuid={uuid} />
        </Grid>
      </Grid>

      <Card>
        <Typography variant="subtitle2" sx={{ pl: 5, pt: 3, mb: 2 }}>
          Transaction History
        </Typography>
        <BeneficiaryDetailsTableView data={[]} />
      </Card>
    </Container>
  );
}
