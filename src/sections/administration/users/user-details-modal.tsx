import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IUserItem } from 'src/types/administration';

type Props = {
  open: boolean;
  onClose: () => void;
  user: IUserItem;
  onActivate: (walletAddress: string, isActive: boolean) => void;
  onChangeRole: (walletAddress: string, role: string) => void;
};

const UserDetails = ({ open, onClose, user, onActivate, onChangeRole }: Props) => {
  console.log('user', user);
  const methods = useForm();

  const { handleSubmit } = methods;

  const [isActive, setIsActive] = useState(user.isApproved);
  const [role, setRole] = useState(user.roles);

  const onSubmit = handleSubmit(async () => {
    try {
      console.log('submit');
    } catch (error) {
      console.error(error);
    }
  });

  const handleActivateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActive(event.target.checked);
    onActivate(user.walletAddress, event.target.checked);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
    onChangeRole(user.walletAddress, event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{user.name}</DialogTitle>

      <DialogContent sx={{ color: 'text.secondary' }}>
        <Stack spacing={2}>
          <Typography variant="subtitle1">Email: {user.email}</Typography>
          <Typography variant="subtitle1">Wallet Address: {user.walletAddress}</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isActive}
                  onChange={handleActivateChange}
                  name="isActive"
                  color="success"
                />
              }
              label="Active"
            />
          </FormGroup>
          <FormGroup>
            <Typography variant="subtitle1">Role:</Typography>
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={role === 'admin'}
                    onChange={handleRoleChange}
                    value="admin"
                    name="admin"
                    color="success"
                  />
                }
                label="Admin"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={role === 'user'}
                    onChange={handleRoleChange}
                    value="user"
                    name="user"
                    color="success"
                  />
                }
                label="User"
              />
            </Stack>
          </FormGroup>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="text" color="success" onClick={onClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetails;
