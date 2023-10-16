import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
};

const BeneficiaryDeleteModal = ({ open, onClose, onOk }: Props) => {
  const handleDelete = () => {
    onOk();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Beneficiary.</DialogTitle>

      <DialogContent sx={{ color: 'text.secondary' }}>
        Are you Sure you want to delete this Beneficiary?
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

export default BeneficiaryDeleteModal;
