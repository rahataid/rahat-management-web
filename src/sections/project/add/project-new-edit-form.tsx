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
import Iconify from '@components/iconify/iconify';
import { Alert, AlertTitle, Button, Tooltip } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ProjectsService from '@services/projects';
import { useMutation } from '@tanstack/react-query';
import { generateWalletAddress } from '@web3/utils';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { IApiResponseError, IProjectCreateItem, IProjectDetails } from 'src/types/project';

type Props = {
  currentProject?: IProjectCreateItem;
};

interface FormValues extends IProjectCreateItem {}

const ProjectForm: React.FC = ({ currentProject }: Props) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

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
      push(`${paths.dashboard.general.projects.list}`);
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
    extras: Yup.string().optional(),
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
      extras:'',
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

  const onSubmit = useCallback((data: IProjectCreateItem) => {
    data.extras = 'isNotBlockchain'
    mutate(data);
  },[mutate]);
  

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error Creating Project</AlertTitle>
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

              <RHFTextField name="location" label="Location" />

              <RHFTextField name="projectManager" label="Project Manager" />

              <RHFTextField name="description" label="Description" />

              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field, fieldState: { error: err } }) => (
                    <DatePicker
                      {...field}
                      label="Start date"
                      format="dd/MM/yyyy"
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

                <Controller
                  name="endDate"
                  control={control}
                  render={({ field, fieldState: { error: err } }) => (
                    <DatePicker
                      {...field}
                      label="End date"
                      format="dd/MM/yyyy"
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
              </Stack>

              <RHFTextField
                name="contractAddress"
                label="Contract Address"
                InputProps={{
                  endAdornment: (
                    <Tooltip title="Generate Contract Address" sx={{ margin: '0 !important' }}>
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
                            onClick={handleGenerateContractAddress}
                          />
                        }
                      />
                    </Tooltip>
                  ),
                }}
                sx={{ padding: '0 !important' }}
              />

              {/* <RHFSelect name="projectType" label="Project Type">
                {projectTypeOptions.map((projectType) => (
                  <MenuItem key={projectType} value={projectType}>
                    {projectType}
                  </MenuItem>
                ))}
              </RHFSelect> */}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="outlined" color="success" loading={isLoading}>
                Create Project
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default memo(ProjectForm);
