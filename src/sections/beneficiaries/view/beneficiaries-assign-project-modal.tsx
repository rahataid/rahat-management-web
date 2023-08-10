import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
} from '@mui/material';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFSelect } from 'src/components/hook-form';
import { IProjectsList } from 'src/types/project';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { IAssignProjectItem } from 'src/types/beneficiaries';
import * as Yup from 'yup';

type Props = {
  open: boolean;
  onClose: () => void;
  projects: IProjectsList['rows'];
  onOk: (data: any) => void;
};

interface FormValues extends IAssignProjectItem {}

const BeneficiariesAssignProjectModal = ({ open, onClose, projects, onOk }: Props) => {
  const AssignProjectSchema = Yup.object().shape({
    projectId: Yup.string().required('Project must be selected'),
  });

  const defaultValues = useMemo<FormValues>(
    () => ({
      projectId: null,
    }),
    []
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(AssignProjectSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset: formReset,
    formState: { errors, isSubmitting },
  } = methods;

  return (
    <Dialog open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onOk)}>
        {errors && (
          <Alert severity="error">
            <AlertTitle>Error Creating Project</AlertTitle>
            {errors?.projectId?.message}
          </Alert>
        )}
        <DialogTitle>Assign Project</DialogTitle>

        <DialogContent sx={{ color: 'text.secondary' }}>
          Select the project to be assigned to the beneficiary
        </DialogContent>

        <Stack sx={{ p: 2 }} spacing={5}>
          <RHFSelect name="projectId" label="Projects" color="success">
            <MenuItem value="">None</MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />

            {projects.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </RHFSelect>
        </Stack>
        <DialogActions>
          <Button variant="text" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton type="submit" variant="text" color="success" loading={isSubmitting}>
            Assign
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default BeneficiariesAssignProjectModal;
