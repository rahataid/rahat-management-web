import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
// components
import Iconify from '@components/iconify/iconify';
import { Button, MenuItem, Tooltip } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  bankStatusFilterOptions,
  genderFilterOptions,
  internetStatusFilterOptions,
  phoneStatusFilterOptions,
} from 'src/api/beneficiaries';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { IBeneficiariesCreateItem } from 'src/types/beneficiaries';

type Props = {
  currentBeneficiary?: IBeneficiariesCreateItem;
};

export default function BeneficiariesForm({ currentBeneficiary }: Props) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewBeneficiarySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    phoneOwnership: Yup.string().required('Phone Owner is required'),
    phoneStatus: Yup.string().required('Phone Type is required'),
    bankStatus: Yup.string().required('Bank status is required'),
    internetStatus: Yup.string().required('Internet status is required'),
    dob: Yup.mixed<any>().nullable().required('DOB is required'),
    walletAddress: Yup.string().required('Wallet address is required'),
    longitude: Yup.number().nullable().optional(),
    latitude: Yup.number().nullable().optional(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentBeneficiary?.name || '',
      phoneNumber: currentBeneficiary?.phoneNumber || '',
      gender: currentBeneficiary?.gender || '',
      phoneOwnership: currentBeneficiary?.phoneOwnership || '',
      phoneStatus: currentBeneficiary?.phoneStatus || '',
      bankStatus: currentBeneficiary?.bankStatus || '',
      internetStatus: currentBeneficiary?.internetStatus || '',
      dob: currentBeneficiary?.dob || null,
      walletAddress: currentBeneficiary?.walletAddress || '',
      longitude: currentBeneficiary?.longitude || null,
      latitude: currentBeneficiary?.latitude || null,
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
    setValue,
    control,
    trigger,
  } = methods;

  const handleGenerateWalletAddress = () => {
    setValue('walletAddress', '0x123456abcde');
    trigger('walletAddress');
  };

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

              <RHFSelect name="gender" label="Gender">
                {genderFilterOptions.map((gender) => (
                  <MenuItem key={gender.value} value={gender.value}>
                    {gender.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <Controller
                name="dob"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    {...field}
                    disableFuture
                    label="Date Of Birth"
                    format="dd/MM/yyyy"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />

              <RHFTextField name="phoneOwnership" label="Phone Ownership" />

              <RHFSelect name="phoneStatus" label="Phone Type">
                {phoneStatusFilterOptions.map((phoneStatus) => (
                  <MenuItem key={phoneStatus.value} value={phoneStatus.value}>
                    {phoneStatus.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect name="bankStatus" label="Bank Status">
                {bankStatusFilterOptions.map((bankStatus) => (
                  <MenuItem key={bankStatus.value} value={bankStatus.value}>
                    {bankStatus.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect name="internetStatus" label="Internet Status">
                {internetStatusFilterOptions.map((internetStatus) => (
                  <MenuItem key={internetStatus.value} value={internetStatus.value}>
                    {internetStatus.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField
                name="walletAddress"
                label="Wallet Address"
                InputProps={{
                  endAdornment: (
                    <Tooltip title="Generate Wallet Address" sx={{ margin: '0 !important' }}>
                      <Button
                        sx={{
                          padding: 0,
                          margin: 0,
                          minWidth: '40px !important',
                          width: '40px !important',
                          height: '40px !important',
                          borderRadius: '50%',
                          marginRight: '-12px !important',
                        }}
                        startIcon={
                          <Iconify
                            sx={{
                              width: 24,
                              height: 24,
                              margin: '0px !important',
                              marginRight: '-12px !important',
                            }}
                            icon="ph:wallet-duotone"
                            onClick={handleGenerateWalletAddress}
                          />
                        }
                      />
                    </Tooltip>
                  ),
                }}
                sx={{ padding: '0 !important' }}
              />

              <RHFTextField name="longitude" label="Longitude" type="number" />

              <RHFTextField name="latitude" label="Latitude" type="number" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="outlined"
                color="success"
                loading={isSubmitting}
              >
                {!currentBeneficiary ? 'Create Beneficiary' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
