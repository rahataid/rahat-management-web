import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// utils
// routes
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// types
// assets
import {
  genderFilterOptions,
  phoneTypeFilterOptions,
  villageFilterOptions,
} from 'src/_mock/_beneficiaries';
// components
import FormProvider, { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { IBeneficiariesCreateItem } from 'src/types/beneficiaries';

type Props = {
  currentBeneficiary?: IBeneficiariesCreateItem;
};

export default function BeneficiariesNewEditForm({ currentBeneficiary }: Props) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewBeneficiarySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    village: Yup.string().required('Village is required'),
    phoneOwnership: Yup.string().required('Phone Owner is required'),
    phoneType: Yup.string().required('Phone Type is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentBeneficiary?.name || '',
      phoneNumber: currentBeneficiary?.phoneNumber || '',
      gender: currentBeneficiary?.gender || '',
      village: currentBeneficiary?.village || '',
      phoneOwnership: currentBeneficiary?.phoneOwnership || '',
      phoneType: currentBeneficiary?.phoneType || '',
    }),
    [currentBeneficiary]
  );

  const methods = useForm({
    resolver: yupResolver(NewBeneficiarySchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentBeneficiary ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.general.beneficiaries.list);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Name" />
              <RHFTextField name="phoneNumber" label="Phone Number" />

              <RHFAutocomplete
                name="gender"
                label="Gender"
                options={genderFilterOptions.map((gender) => gender)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
              />

              <RHFAutocomplete
                name="village"
                label="Village"
                options={villageFilterOptions.map((village) => village)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
              />

              <RHFTextField name="phoneOwnership" label="Phone Ownership" />

              <RHFAutocomplete
                name="phoneType"
                label="Phone Type"
                options={phoneTypeFilterOptions.map((phoneType) => phoneType)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentBeneficiary ? 'Create Beneficiary' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
