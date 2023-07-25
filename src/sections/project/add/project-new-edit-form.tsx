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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ProjectsService from '@services/projects';
import { useMutation } from '@tanstack/react-query';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { IApiResponseError } from 'src/types/beneficiaries';
import { IProjectCreateItem } from 'src/types/project';

type Props = {
  currentProject?: IProjectCreateItem;
};

export default function ProjectAddForm({ currentProject }: Props) {
  const { push } = useRouter();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const { error, isLoading, mutate } = useMutation<
  IProjectCreateItem,
  IApiResponseError,
  IProjectCreateItem
>({
  mutationFn: async (createData: IProjectCreateItem) => {
    const response = await ProjectsService.create(createData);
    return response.data;
  },
  onError: () => {
    enqueueSnackbar('Error creating beneficiary', { variant: 'error' });
  },
  onSuccess: (data) => {
    enqueueSnackbar('Beneficiary created successfully', { variant: 'success' });
    reset();

    push(`${paths.dashboard.general.projects.list}`);
  },
});

  const NewBeneficiarySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    location: Yup.string().required('Location is required'),
    projectManager: Yup.string().required('Project Manager is required'),
    description: Yup.string().required('Description is required'),
    startDate: Yup.mixed<any>().nullable().required('Start date is required'),
    endDate: Yup.mixed<any>()
      .required('End date is required')
      .test(
        'date-min',
        'End date must be later than start date',
        (value, { parent }) => value.getTime() > parent.startDate.getTime()
      ),
    projectType: Yup.string().required('Project type is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProject?.name || '',
      location: currentProject?.location || '',
      projectManager: currentProject?.projectManager || '',
      description: currentProject?.description || '',
      startDate: currentProject?.startDate || null,
      endDate: currentProject?.endDate || null,
      projectType: currentProject?.projectType || '',
    }),
    [currentProject]
  );

  const methods = useForm({
    resolver: yupResolver(NewBeneficiarySchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutate(data);
      reset();
      enqueueSnackbar(currentProject ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.general.projects.list);
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

              <RHFTextField name="location" label="Location" />

              <RHFTextField name="projectManager" label="Project Manager" />

              <RHFTextField name="description" label="Description" />

              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Start date"
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

                <Controller
                  name="endDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="End date"
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
              </Stack>

              {/* <RHFSelect name="projectType" label="Project Type">
                {projectTypeOptions.map((projectType) => (
                  <MenuItem key={projectType} value={projectType}>
                    {projectType}
                  </MenuItem>
                ))}
              </RHFSelect> */}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="outlined"
                color="success"
                loading={isSubmitting}
              >
                {!currentProject ? 'Create Project' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
