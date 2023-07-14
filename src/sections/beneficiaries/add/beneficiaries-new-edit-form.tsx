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
// types
// assets
// components
import Iconify from '@components/iconify/iconify';
import { Alert, AlertTitle, Button, MenuItem, Tooltip } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { generateWalletAddress } from '@web3/utils';

import {
  bankStatusOptions,
  genderOptions,
  internetAccessOptions,
  phoneStatusOptions,
} from 'src/_mock/_beneficiaries';
import { useBeneficiaryCreate } from 'src/api/beneficiaries';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { IBeneficiariesCreateItem } from 'src/types/beneficiaries';

type Props = {
  currentBeneficiary?: IBeneficiariesCreateItem;
};

export default function BeneficiariesForm({ currentBeneficiary }: Props) {
  const router = useRouter();

  const { mutate, error, isSuccess, loading } = useBeneficiaryCreate();

  const NewBeneficiarySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('GENDER is required'),
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
      phone: currentBeneficiary?.phone || '',
      gender: currentBeneficiary?.gender || '',
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
    const { address } = generateWalletAddress();
    setValue('walletAddress', address);
    trigger('walletAddress');
  };

  const onSubmit = async (data) => {
    mutate(data);
    if (error) {
      console.log('error', error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error Creating Beneficiary</AlertTitle>
          {error?.message}
        </Alert>
      )}
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

              <RHFTextField name="phone" label="Phone Number" />

              <RHFSelect name="gender" label="GENDER">
                {genderOptions.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender}
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

              <RHFSelect name="phoneStatus" label="Phone Type">
                {phoneStatusOptions.map((phoneStatus) => (
                  <MenuItem key={phoneStatus} value={phoneStatus}>
                    {phoneStatus}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect name="bankStatus" label="Bank Status">
                {bankStatusOptions.map((bankStatus) => (
                  <MenuItem key={bankStatus} value={bankStatus}>
                    {bankStatus}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect name="internetStatus" label="Internet Status">
                {internetAccessOptions.map((internetStatus) => (
                  <MenuItem key={internetStatus} value={internetStatus}>
                    {internetStatus}
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
