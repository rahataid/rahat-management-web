import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFSelect } from 'src/components/hook-form';
import { IProjectsList } from 'src/types/project';

type Props = {
  open: boolean;
  onClose: () => void;
  projects: IProjectsList['rows'];
  onOk: () => void;
};

const BeneficiariesAssignProjectModal = ({ open, onClose, projects, onOk }: Props) => {
  const methods = useForm({
    // resolver: yupResolver(FormSchema),
    // defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async () => {
    try {
      console.log('submit');
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Assign Project</DialogTitle>

      <DialogContent sx={{ color: 'text.secondary' }}>
        Select Project To Assign Beneficiary
      </DialogContent>

      <Stack sx={{ p: 2 }} spacing={5}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <RHFSelect name="singleSelect" label="Projects" color="success">
            <MenuItem value="">None</MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />

            {projects.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </RHFSelect>
        </FormProvider>
      </Stack>
      <DialogActions>
        <Button variant="text" color="success" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled variant="text" onClick={onOk} autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BeneficiariesAssignProjectModal;
