'use client';

import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { paths } from '@routes/paths';
import BeneficiariesForm from './beneficiaries-new-edit-form';

const BeneficiaryAddView = () => {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Beneficiaries: Add"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Beneficiary', href: paths.dashboard.general.beneficiaries.list },
          { name: 'Add' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <BeneficiariesForm />
    </Container>
  );
};

export default BeneficiaryAddView;
