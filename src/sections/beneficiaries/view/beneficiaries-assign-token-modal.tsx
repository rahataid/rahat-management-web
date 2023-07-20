import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

type Props = {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
};

const BeneficiariesAssignTokenModal = ({ open, onClose, onOk }: Props) => {
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
      <DialogTitle>Assign Token</DialogTitle>

      <DialogContent sx={{ color: 'text.secondary' }}>
        Enter Token To Assign Beneficiary
      </DialogContent>

      <Stack sx={{ p: 2 }} spacing={5}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <RHFTextField name="token" label="Token" color="success" />
        </FormProvider>
      </Stack>
      <DialogActions>
        <Button variant="text" color="success" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled variant="text" onClick={onOk} autoFocus>
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BeneficiariesAssignTokenModal;
