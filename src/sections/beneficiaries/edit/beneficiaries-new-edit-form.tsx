import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, AlertTitle, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { paths } from '@routes/paths';
import BeneficiaryService from '@services/beneficiaries';
import { useMutation } from '@tanstack/react-query';
import { generateWalletAddress } from '@web3/utils';
import { parseISO } from 'date-fns';
import { useParams } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  bankStatusOptions,
  genderOptions,
  internetAccessOptions,
  phoneStatusOptions,
} from 'src/_mock/_beneficiaries';
import { useBeneficiary } from 'src/api/beneficiaries';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useRouter } from 'src/routes/hook';
import {
  GENDER,
  IApiResponseError,
  IBeneficiariesCreateItem,
  IBeneficiaryDetails,
} from 'src/types/beneficiaries';
import * as Yup from 'yup';

interface FormValues extends IBeneficiariesCreateItem {}

const BeneficiariesForm: React.FC = () => {
  const params = useParams();

  const { beneficiary } = useBeneficiary(params.uuid);
  console.log(beneficiary, 'beneficiary');

  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { error, isLoading, mutate } = useMutation<
    IBeneficiaryDetails,
    IApiResponseError,
    IBeneficiariesCreateItem
  >({
    mutationFn: async (updateData: IBeneficiariesCreateItem) => {
      const response = await BeneficiaryService.update(beneficiary.uuid, updateData);
      return response.data;
    },
    onError: () => {
      enqueueSnackbar('Error updating beneficiary', { variant: 'error' });
    },
    onSuccess: (data) => {
      enqueueSnackbar('Beneficiary updated successfully', { variant: 'success' });
      reset();

      push(`${paths.dashboard.general.beneficiaries.list}/${data?.uuid}`);
    },
  });

  const NewBeneficiarySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().nullable().optional(),
    gender: Yup.mixed<GENDER>().required('Select your gender'),
    phoneOwnership: Yup.string().required('Select your phone type'),
    bankStatus: Yup.string().required('Select your bank status'),
    internetAccess: Yup.string().required('Select your internet type'),
    dob: Yup.date().nullable().optional(),
    walletAddress: Yup.string().nullable().required('Wallet address is required'),
    longitude: Yup.number().nullable().optional(),
    latitude: Yup.number().nullable().optional(),
  });

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: '',
      gender: null,
      phoneOwnership: null,
      bankStatus: null,
      internetAccess: null,
      dob: null,
      walletAddress: '',
      longitude: null,
      latitude: null,
      phone: null,
    }),
    []
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(NewBeneficiarySchema),
    defaultValues,
  });

  const { reset, handleSubmit, setValue, control, trigger } = methods;

  useEffect(() => {
    if (beneficiary) {
      const defaultValuesKeys = Object.keys(defaultValues) as (keyof FormValues)[];
      const beneficiaryKeys = Object.keys(beneficiary) as (keyof FormValues)[];

      const keysToSet = defaultValuesKeys.filter((key) => beneficiaryKeys.includes(key));

      keysToSet.forEach((key) => {
        const value = beneficiary[key];
        const formKey = key as keyof FormValues;

        if (formKey === 'dob') {
          const dateObject: any = parseISO(value as string);
          setValue(formKey, dateObject);
        } else {
          setValue(formKey, value as string);
        }
      });
    }
  }, [defaultValues, beneficiary, setValue]);

  const handleGenerateWalletAddress = useCallback(() => {
    const { address } = generateWalletAddress();
    setValue('walletAddress', address);
    trigger('walletAddress');
  }, [setValue, trigger]);

  const onSubmit = useCallback((data: IBeneficiariesCreateItem) => mutate(data), [mutate]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error Updating Beneficiary</AlertTitle>
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
              <RHFTextField InputLabelProps={{ shrink: true }} name="name" label="Name" />

              <RHFTextField InputLabelProps={{ shrink: true }} name="phone" label="Phone Number" />

              <RHFSelect InputLabelProps={{ shrink: true }} name="gender" label="GENDER">
                {genderOptions.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </RHFSelect>

              <Controller
                name="dob"
                control={control}
                render={({ field, fieldState }) => {
                  const { error: fieldError } = fieldState;

                  return (
                    <DatePicker
                      {...field}
                      disableFuture
                      label="Date Of Birth"
                      format="dd/MM/yyyy"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!fieldError,
                          helperText: fieldError?.message,
                        },
                      }}
                    />
                  );
                }}
              />

              <RHFSelect
                InputLabelProps={{ shrink: true }}
                name="phoneOwnership"
                label="Type of Phone"
              >
                {phoneStatusOptions.map((phoneOwnership) => (
                  <MenuItem key={phoneOwnership} value={phoneOwnership}>
                    {phoneOwnership}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect InputLabelProps={{ shrink: true }} name="bankStatus" label="Bank Status">
                {bankStatusOptions.map((bankStatus) => (
                  <MenuItem key={bankStatus} value={bankStatus}>
                    {bankStatus}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect
                InputLabelProps={{ shrink: true }}
                name="internetAccess"
                label="Internet Access"
              >
                {internetAccessOptions.map((internetAccess) => (
                  <MenuItem key={internetAccess} value={internetAccess}>
                    {internetAccess}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField
                InputLabelProps={{ shrink: true }}
                name="longitude"
                label="Longitude"
                type="number"
              />

              <RHFTextField
                InputLabelProps={{ shrink: true }}
                name="latitude"
                label="Latitude"
                type="number"
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="outlined" color="success" loading={isLoading}>
                Update Beneficiary
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default memo(BeneficiariesForm);
