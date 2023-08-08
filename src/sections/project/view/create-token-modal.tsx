import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  onOk: (v: any) => void;
};

const CreateTokenModal = ({ open, onClose, onOk }: Props) => {
  const [token, setToken] = useState('');
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Token</DialogTitle>

      <DialogContent sx={{ color: 'text.secondary' }}>
        Enter Token To Create in the project
      </DialogContent>

      <Stack sx={{ p: 2 }} spacing={5}>
        <TextField
          name="token"
          label="Token"
          color="success"
          value={token}
          onChange={(e) => setToken(e.target?.value)}
        />
      </Stack>
      <DialogActions>
        <Button variant="text" color="success" onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton onClick={() => onOk(token)} type="submit" autoFocus>
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTokenModal;
