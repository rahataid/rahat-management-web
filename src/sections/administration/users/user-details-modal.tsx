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
  const methods = useForm();

  const { handleSubmit } = methods;

  const [isActive, setIsActive] = useState(user.isApproved);
  const [role, setRole] = useState(user?.roles);
  console.log('role', role);

  const handleActivateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActive(event.target.checked);
    onActivate(user.walletAddress, event.target.checked);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
    onChangeRole(user?.walletAddress, event.target.value);
  };

  const handleDisable = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('User Disabled');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{user.name}</DialogTitle>

      <DialogContent sx={{ color: 'text.secondary' }}>
        <Stack spacing={2}>
          <Typography variant="subtitle1">Email: {user.email}</Typography>
          <Typography variant="subtitle1">Wallet Address: {user.walletAddress}</Typography>
          <FormGroup>
            <Stack direction="row" spacing={2}>
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
              <FormControlLabel
                control={<Switch onChange={handleDisable} name="isDisable" color="success" />}
                label="Disable"
              />
            </Stack>
          </FormGroup>
          <FormGroup>
            <Typography variant="subtitle1">Role:</Typography>
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={role === 'User'}
                    onChange={handleRoleChange}
                    value="User"
                    name="user"
                    color="success"
                  />
                }
                label="User"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={role === 'Manager'}
                    onChange={handleRoleChange}
                    value="Manager"
                    name="manager"
                    color="success"
                  />
                }
                label="Manager"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={role === 'Donor'}
                    onChange={handleRoleChange}
                    value="Donor"
                    name="donor"
                    color="success"
                  />
                }
                label="Donor"
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
