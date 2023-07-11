'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
//
import BeneficiariesNewEditForm from '../beneficiaries-new-edit-form';

export default function BeneficiariesCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new beneficiary"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Beneficiaries',
            href: paths.dashboard.general.beneficiaries.list,
          },
          { name: 'New Beneficiary' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <BeneficiariesNewEditForm />
    </Container>
  );
}
