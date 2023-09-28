import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
};

const ProjectCampaignDeleteModal = ({ open, onClose, onOk }: Props) => {
  const handleDelete = () => {
    onOk();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Remove Project Camapign.</DialogTitle>

      <DialogContent sx={{ color: 'text.secondary' }}>
        Are you Sure you want to remove these campaigns from Project?
      </DialogContent>

      <DialogActions>
        <Button variant="text" color="success" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="text" onClick={handleDelete} autoFocus>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectCampaignDeleteModal;
