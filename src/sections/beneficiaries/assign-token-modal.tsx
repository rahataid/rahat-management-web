import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

type Props = {
  open: boolean;
  onClose: () => void;
  onOk: (walletAddresses: string[]) => void;
  selected: string[];
};

const BeneficiariesAssignTokenModal = ({ open, onClose, onOk, selected }: Props) => {
  const methods = useForm();

  const { handleSubmit } = methods;

  const [token, setToken] = useState('');

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
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          {`Assign Token to ${selected.length} Beneficiar${selected.length > 1 ? 'ies' : 'y'}`}
        </Typography>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <RHFTextField
            name="token"
            label="Token"
            color="success"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            helperText={
              token && (
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  {token} tokens will be given to {selected.length} beneficiaries. Total Tokens
                  spent = {+token * selected.length}
                </Typography>
              )
            }
          />
        </FormProvider>
      </DialogContent>

      <DialogActions>
        <Button variant="text" color="success" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={!token} variant="text" onClick={() => onOk(selected)} autoFocus>
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BeneficiariesAssignTokenModal;
