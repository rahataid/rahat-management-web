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
  Typography,
} from '@mui/material';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFSelect } from 'src/components/hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { useProjects } from 'src/api/project';
import { IAssignProjectItem } from 'src/types/beneficiaries';
import * as Yup from 'yup';

type Props = {
  open: boolean;
  onClose: () => void;
  onOk: (data: any) => void;
  selected: string[];
};

interface FormValues extends IAssignProjectItem {}

const BeneficiariesAssignProjectModal = ({ open, onClose, onOk, selected }: Props) => {
  const { projects } = useProjects({
    perPage: 100,
    page: 1,
  });

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
    formState: { errors, isSubmitting, touchedFields },
  } = methods;
  return (
    <Dialog open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onOk)}>
        {errors?.projectId && (
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
          <RHFSelect
            name="projectId"
            label="Projects"
            color="success"
            helperText={
              touchedFields.projectId && (
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  {selected.length} beneficiaries will be assigned to this project.
                </Typography>
              )
            }
          >
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
