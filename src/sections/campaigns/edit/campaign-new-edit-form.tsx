import { yupResolver } from '@hookform/resolvers/yup';
import { memo, useCallback, useMemo } from 'react';
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
import { useBoolean } from '@hooks/use-boolean';
import { Alert, AlertTitle, Button, MenuItem } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import ProjectsService from '@services/projects';
import { useMutation } from '@tanstack/react-query';
import { generateWalletAddress } from '@web3/utils';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { CAMPAIGN_TYPES, ICampaignFilterOptions } from 'src/types/campaigns';
import { IApiResponseError, IProjectCreateItem, IProjectDetails } from 'src/types/project';
import CampaignAssignBenficiariesModal from './campaign-assign-beneficiaries-modal';

type Props = {
  currentProject?: IProjectCreateItem;
};

interface FormValues extends IProjectCreateItem { }

const CampaignEditForm: React.FC = ({ currentProject }: Props) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const assignCampaignDialog = useBoolean();


  const { error, isLoading, mutate } = useMutation<
    IProjectDetails,
    IApiResponseError,
    IProjectCreateItem
  >({
    mutationFn: async (createData: IProjectCreateItem) => {
      const response = await ProjectsService.create(createData);
      return response.data;
    },
    onError: () => {
      enqueueSnackbar('Error creating project', { variant: 'error' });
    },
    onSuccess: (data) => {
      enqueueSnackbar('Project created successfully', { variant: 'success' });
      reset();
      push(`${paths.dashboard.general.projects.list}/${data?.contractAddress}`);
    },
  });

  const NewProjectSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    location: Yup.string().required('Location is required'),
    projectManager: Yup.string().required('Project Manager is required'),
    description: Yup.string().required('Description is required'),
    startDate: Yup.mixed<any>().nullable().required('Start date is required'),
    endDate: Yup.mixed<any>()
      .nullable()
      .required('End date is required')
      .test(
        'date-min',
        'End date must be later than start date',
        (value, { parent }) => value.getTime() > parent.startDate?.getTime()
      ),
    contractAddress: Yup.string().nullable().required('Contract address is required'),
    owner: Yup.number(),
  });

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: currentProject?.name || '',
      location: currentProject?.location || '',
      projectManager: currentProject?.projectManager || '',
      description: currentProject?.description || '',
      startDate: currentProject?.startDate || null,
      endDate: currentProject?.endDate || null,
      contractAddress: currentProject?.contractAddress || '',
      owner: 1,
    }),
    [currentProject]
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(NewProjectSchema),
    defaultValues,
  });

  const { reset, handleSubmit, control, setValue, trigger } = methods;

  const handleGenerateContractAddress = useCallback(() => {
    const { address } = generateWalletAddress();
    setValue('contractAddress', address);
    trigger('contractAddress');
  }, [setValue, trigger]);

  const onSubmit = useCallback((data: IProjectCreateItem) => mutate(data), [mutate]);

  const campaignTypeOptions: ICampaignFilterOptions = Object.values(CAMPAIGN_TYPES) as string[];


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
          console.log('assigned');
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
              }}
            >
              <RHFTextField name="campaignName" label="Campaign Name" />

              <Controller
                name="startDate"
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

              <RHFTextField name="location" label="Details" />

              <RHFSelect name="campaignTypes" label="Select Campaign Types">
                {campaignTypeOptions.map((campaign) => (
                  <MenuItem key={campaign} value={campaign}>
                    {campaign}
                  </MenuItem>
                ))}
              </RHFSelect>


              <RHFSelect name="transport" label="Select Transport ">
                <MenuItem key='solana' value='Solana'>
                  Solana
                </MenuItem>
              </RHFSelect>

              <Stack alignItems={'flex-start'}>
                <RHFSelect name="transport" label="Select Beneficiaries " >
                  <MenuItem key='solana' value='Solana'>
                    Beneficiaries
                  </MenuItem>
                </RHFSelect>
                <Button variant="text" color="primary" onClick={assignCampaignDialog.onTrue}>
                  Register Audiences
                </Button>
              </Stack>
            </Box>



            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="outlined" color="success" loading={isLoading}>
                Create Campaign
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default memo(CampaignEditForm);
