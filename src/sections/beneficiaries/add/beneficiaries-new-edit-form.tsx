import Iconify from '@components/iconify/iconify';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, AlertTitle, Button, MenuItem, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { paths } from '@routes/paths';
import BeneficiaryService from '@services/beneficiaries';
import useProjectContract from '@services/contracts/useProject';
import { useMutation } from '@tanstack/react-query';
import { interruptChainActions } from '@utils/chainActionInterrupt';
import { generateWalletAddress } from '@web3/utils';
import { useSnackbar } from 'notistack';
import { memo, useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  bankStatusOptions,
  genderOptions,
  internetAccessOptions,
  phoneStatusOptions,
} from 'src/_mock/_beneficiaries';
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
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { activateBeneficiary } = useProjectContract();

  const { error, isLoading, mutate } = useMutation<
    IBeneficiaryDetails,
    IApiResponseError,
    IBeneficiariesCreateItem
  >({
    mutationFn: async (createData: IBeneficiariesCreateItem) => {
      const response = await BeneficiaryService.create(createData);
      return response.data;
    },
    onError: () => {
      enqueueSnackbar('Error creating beneficiary', { variant: 'error' });
    },
    onSuccess: (data) => {
      enqueueSnackbar('Beneficiary created successfully', { variant: 'success' });
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
      phone: null,
      gender: null,
      phoneOwnership: null,
      bankStatus: null,
      internetAccess: null,
      dob: null,
      walletAddress: '',
      longitude: null,
      latitude: null,
    }),
    []
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(NewBeneficiarySchema),
    defaultValues,
  });

  const { reset, handleSubmit, setValue, control, trigger } = methods;

  const handleGenerateWalletAddress = useCallback(() => {
    const { address } = generateWalletAddress();
    setValue('walletAddress', address);
    trigger('walletAddress');
  }, [setValue, trigger]);

  const onSubmit = useCallback(
    async (data: IBeneficiariesCreateItem) => {
      // TODO:Interrupted chain actions temporarily disabled

      const activateToChain = await interruptChainActions(activateBeneficiary, data.walletAddress);
      // const activateToChain = await activateBeneficiary(data.walletAddress);
      if (activateToChain) mutate(data);
    },
    [activateBeneficiary, mutate]
  );

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

              <RHFSelect name="phoneOwnership" label="Type of Phone">
                {phoneStatusOptions.map((phoneOwnership) => (
                  <MenuItem key={phoneOwnership} value={phoneOwnership}>
                    {phoneOwnership}
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

              <RHFSelect name="internetAccess" label="Internet Access">
                {internetAccessOptions.map((internetAccess) => (
                  <MenuItem key={internetAccess} value={internetAccess}>
                    {internetAccess}
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
              <LoadingButton type="submit" variant="outlined" color="success" loading={isLoading}>
                Create Beneficiary
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default memo(BeneficiariesForm);
