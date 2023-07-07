'use client';

import { useBeneficiary } from 'src/api/beneficiaries';
// mui
import Container from '@mui/material/Container';
// routes
import { paths } from '@routes/paths';
import { useParams } from 'src/routes/hook';
// components
import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { Grid, Stack } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';

import BeneficiariesDetailsCard from './beneficiaries-details-card';
import BeneficiariesDetailsClaimsCard from './beneficiaries-details-claims-card';

export default function BeneficiariesDetailsView() {
  const { beneficiary, beneficiaryClaimsDetails } = useBeneficiary();
  const { hash } = useParams();
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
      <Stack direction="column" spacing={3}>
        <Grid container xs={12} md={12} spacing={2}>
          <Grid item xs={12} md={7}>
            <BeneficiariesDetailsCard data={beneficiary}/>
          </Grid>
          <Grid item xs={12} md={5}>
            <BeneficiariesDetailsClaimsCard data={beneficiaryClaimsDetails}/>
          </Grid>          
        </Grid>
      </Stack>
    </Container>
  );
}
