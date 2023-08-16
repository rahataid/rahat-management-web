import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFSelect } from 'src/components/hook-form';

type Props = {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
};

const CampaignAssignBenficiariesModal = ({ open, onClose, onOk }: Props) => {
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
      <DialogTitle>Register Beneficiaries.</DialogTitle>

      <DialogContent sx={{ color: 'text.secondary' }}>
        Register Existing Beneficiaries as audience of the campaign.
      </DialogContent>

      <Stack sx={{ p: 2 }} spacing={5}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <RHFSelect name="transport" label="Beneficiaries ">
            <MenuItem key='solana' value='Solana'>
            </MenuItem>
          </RHFSelect>
        </FormProvider>
      </Stack>
      <DialogActions>
        <Button variant="text" color="success" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="text" onClick={onOk} autoFocus>
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CampaignAssignBenficiariesModal;
