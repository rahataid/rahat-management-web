import { yupResolver } from '@hookform/resolvers/yup';
import { memo, useCallback, useEffect, useMemo } from 'react';
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
import { Alert, AlertTitle } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { paths } from '@routes/paths';
import ProjectsService from '@services/projects';
import { useMutation } from '@tanstack/react-query';
import { parseISO } from 'date-fns';
import { useParams } from 'next/navigation';
import { useProject } from 'src/api/project';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { IApiResponseError, IProjectDetails, IProjectUpdateItem } from 'src/types/project';

interface FormValues extends IProjectUpdateItem {}

const ProjectForm: React.FC = () => {
  const params = useParams();

  const { project } = useProject(params.address);

  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const { error, isLoading, mutate } = useMutation<
    IProjectDetails,
    IApiResponseError,
    IProjectUpdateItem
  >({
    mutationFn: async (updateData: IProjectUpdateItem) => {
      const response = await ProjectsService.update(params.address, updateData);
      return response.data;
    },
    onError: () => {
      enqueueSnackbar('Error updating project', { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Project updated successfully', { variant: 'success' });
      reset();
      push(`${paths.dashboard.general.projects.details(params.address)}`);
    },
  });

  const NewProjectSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    location: Yup.string().required('Location is required'),
    projectManager: Yup.string().required('Project Manager is required'),
    description: Yup.string().required('Description is required'),
    startDate: Yup.date().nullable().required('Start date is required'),
    endDate: Yup.date()
      .nullable()
      .required('End date is required')
      .test(
        'date-min',
        'End date must be later than start date',
        (value, { parent }) => value.getTime() > parent.startDate?.getTime()
      ),
  });

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: project?.name || '',
      location: project?.location || '',
      projectManager: project?.projectManager || '',
      description: project?.description || '',
      startDate: project?.startDate ? new Date(project.startDate) : null,
      endDate: project?.endDate ? new Date(project.endDate) : null,
    }),
    [
      project?.description,
      project?.endDate,
      project?.location,
      project?.name,
      project?.projectManager,
      project?.startDate,
    ]
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(NewProjectSchema),
    defaultValues,
  });

  const { reset, handleSubmit, control, setValue } = methods;

  useEffect(() => {
    if (project) {
      const defaultValuesKeys = Object.keys(defaultValues) as (keyof FormValues)[];
      const projectKeys = Object.keys(project) as (keyof FormValues)[];

      const keysToSet = defaultValuesKeys.filter((key) => projectKeys.includes(key));

      keysToSet.forEach((key) => {
        const value = project[key];
        const formKey = key as keyof FormValues;

        if (formKey === 'startDate' || formKey === 'endDate') {
          const dateObject: any = parseISO(value as string);
          setValue(formKey, dateObject);
        } else {
          setValue(formKey, value as string);
        }
      });
    }
  }, [project, setValue, defaultValues]);
  // const handleGenerateContractAddress: any = useCallback(() => {
  //   const { address } = generateWalletAddress();
  //   setValue('contractAddress', address);
  //   trigger('contractAddress');
  // }, [setValue, trigger]);

  const onSubmit: any = useCallback((data: IProjectUpdateItem) => mutate(data), [mutate]);

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
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="outlined" color="success" loading={isLoading}>
                Update Project
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default memo(ProjectForm);
