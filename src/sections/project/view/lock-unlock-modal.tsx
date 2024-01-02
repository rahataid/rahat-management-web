import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
  description: string;
  okText: string;
  title: string;
  loading: boolean;
};

const LockUnlockModal = ({ open, onClose, onOk, okText, description, title, loading }: Props) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>

    <DialogContent sx={{ color: 'text.secondary' }}>{description}</DialogContent>

    <DialogActions>
      <Button variant="text" color="success" onClick={onClose}>
        Cancel
      </Button>
      <LoadingButton variant="outlined" onClick={onOk} type="submit" autoFocus loading={loading}>
        {okText}
      </LoadingButton>
    </DialogActions>
  </Dialog>
);

export default LockUnlockModal;
