import { yupResolver } from '@hookform/resolvers/yup';
import { memo, useCallback, useMemo, useState } from 'react';
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
import { useBoolean } from '@hooks/use-boolean';
import {
  Alert,
  AlertTitle,
  Button,
  Chip,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { paths } from '@routes/paths';
import CampaignsService from '@services/campaigns';
import { useMutation } from '@tanstack/react-query';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import {
  CAMPAIGN_TYPES,
  IApiResponseError,
  ICampaignCreateItem,
  ICampaignFilterOptions,
} from 'src/types/campaigns';
import CampaignAssignBenficiariesModal from './register-beneficiaries-modal';

type Props = {
  currentCampaign?: ICampaignCreateItem;
};

interface FormValues extends ICampaignCreateItem {}

const CampaignForm: React.FC = ({ currentCampaign }: Props) => {
  const [beneficiary, setBeneficiary] = useState<string[]>([]);
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const assignCampaignDialog = useBoolean();
  const { error, isLoading, mutate } = useMutation<
    ICampaignCreateItem,
    IApiResponseError,
    ICampaignCreateItem
  >({
    mutationFn: async (createData: ICampaignCreateItem) => {
      const response = await CampaignsService.create(createData);
      return response.data;
    },
    onError: () => {
      enqueueSnackbar('Error Updating Campaign', { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Campaign Updated successfully', { variant: 'success' });
      reset();
      push(`${paths.dashboard.general.campaigns.list}`);
    },
  });

  const NewProjectSchema = Yup.object().shape({
    name: Yup.string()
      .required('Campaign name is required')
      .min(4, 'Mininum 4 characters')
      .max(24, 'Maximum 15 characters'),
    startTime: Yup.date().nullable().required('Start date is required'),
    type: Yup.string().required('Campaign Type is required'),
    details: Yup.string().required('Enter the details for the campaign'),
    audienceIds: Yup.array().required('Select the audience for the campaign'),
    transportId: Yup.number().required('Select the transport for the campaign'),
  });

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: currentCampaign?.name || '',
      startTime: currentCampaign?.startTime || '',
      details: currentCampaign?.details || '',
      transportId: currentCampaign?.transportId || '',
      type: currentCampaign?.type as CAMPAIGN_TYPES,
      audienceIds: currentCampaign?.audienceIds || [''],
    }),
    [currentCampaign]
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(NewProjectSchema),
    defaultValues,
  });

  const { reset, handleSubmit, control } = methods;

  const onSubmit = useCallback((data: ICampaignCreateItem) => mutate(data), [mutate]);

  const campaignTypeOptions: ICampaignFilterOptions = Object.values(CAMPAIGN_TYPES) as string[];

  const handleChange = (event: SelectChangeEvent<typeof beneficiary>) => {
    const {
      target: { value },
    } = event;
    setBeneficiary(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error Creating Campaign</AlertTitle>
          {error?.message}
        </Alert>
      )}
      <CampaignAssignBenficiariesModal
        onClose={assignCampaignDialog.onFalse}
        open={assignCampaignDialog.value}
        onOk={() => {
          console.log('Registered');
        }}
      />
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
                md: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Campaign Name" />

              <Controller
                name="startTime"
                control={control}
                render={({ field, fieldState: { error: err } }) => (
                  <DateTimePicker
                    {...field}
                    label="Start Time"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!err,
                        helperText: err?.message,
                      },
                    }}
                  />
                )}
              />

              <RHFSelect name="campaignTypes" label="Select Campaign Types">
                {campaignTypeOptions.map((campaign) => (
                  <MenuItem key={campaign} value={campaign}>
                    {campaign}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField name="details" label="Details" fullWidth />

              <RHFSelect name="transportId" label="Select Transport ">
                <MenuItem key="solana" value="Solana">
                  Somleng
                </MenuItem>
              </RHFSelect>

              <Stack alignItems="flex-start">
                <Select
                  name="audienceIds"
                  multiple
                  value={beneficiary}
                  onChange={handleChange}
                  fullWidth
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value: any) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem key="beneficiary" value="Beneficiary 0">
                    Beneficiary 0
                  </MenuItem>
                </Select>
                <Button variant="text" color="primary" onClick={assignCampaignDialog.onTrue}>
                  Register Audiences
                </Button>
              </Stack>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="outlined" color="success" loading={isLoading}>
                Edit Campaign
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default memo(CampaignForm);
