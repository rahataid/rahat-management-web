import Label from '@components/label';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import useRahatDonor from '@services/contracts/useRahatDonor';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDisableUser } from 'src/api/administration';
import { IUserItem } from 'src/types/administration';

type Props = {
  open: boolean;
  onClose: () => void;
  user: IUserItem;
  onActivate: (walletAddress: string, isActive: boolean) => void;
  onChangeRole: (walletAddress: string, role: string) => void;
  onMakeOwner: (walletAddress: string, e: ChangeEvent<HTMLInputElement>) => void;
};

const UserDetails = ({ open, onClose, user, onActivate, onChangeRole, onMakeOwner }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [role, setRole] = useState('');
  const { isOwner } = useRahatDonor();
  const [isOwnerState, setIsOwnerState] = useState<boolean | null>(null);

  console.log('isOwnerState', isOwnerState);

  useEffect(() => {
    const fetchIsOwner = async () => {
      if (user) {
        const owner = await isOwner(user.walletAddress);
        setIsOwnerState(owner);
      }
    };
    fetchIsOwner();
  }, [isOwner, user, onMakeOwner]);

  console.log(user, 'user');
  useEffect(() => {
    if (user) {
      setRole(user?.roles);
      setIsActive(user?.isApproved);
    }
  }, [user]);

  const disableUser = useDisableUser();

  const handleActivateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActive(event.target.checked);
    onActivate(user.walletAddress, event.target.checked);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
    onChangeRole(user?.walletAddress, event.target.value);
  };

  const handleDisable = () => {
    disableUser.mutate(user?.id);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{user?.name}</DialogTitle>

      <DialogContent sx={{ color: 'text.secondary' }}>
        <Stack spacing={2}>
          <Typography variant="subtitle1">Email: {user?.email}</Typography>
          <Typography variant="subtitle1">Wallet Address: {user?.walletAddress}</Typography>
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
                label="Approve"
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
                    checked={role === 'USER'}
                    onChange={handleRoleChange}
                    value="USER"
                    name="user"
                    color="success"
                  />
                }
                label="User"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={role === 'ADMIN'}
                    onChange={handleRoleChange}
                    value="ADMIN"
                    name="manager"
                    color="success"
                  />
                }
                label="Admin"
              />
            </Stack>
          </FormGroup>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Label color="success">
            <Checkbox
              checked={Boolean(isOwnerState)}
              onChange={(e) => onMakeOwner(user?.walletAddress, e)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            Add as Owner
          </Label>
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
