import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
};

const AudienceRemoveModal = ({ open, onClose, onOk }: Props) => {
  const handleDelete = () => {
    onOk();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Remove Audience.</DialogTitle>

      <DialogContent sx={{ color: 'text.secondary' }}>
        Are you Sure you want to remove this audience?
      </DialogContent>

      <DialogActions>
        <Button variant="text" color="success" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="text" onClick={handleDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AudienceRemoveModal;
