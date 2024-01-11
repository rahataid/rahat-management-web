import FormProvider, { RHFTextField } from '@components/hook-form';
import Label from '@components/label';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import {
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
import AdministrationService from '@services/administration';
import useRahatDonor from '@services/contracts/useRahatDonor';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDisableUser } from 'src/api/administration';
import { IUserItem } from 'src/types/administration';
import * as Yup from 'yup';

type FormValues = {
  name: string;
  email: string;
  walletAddress: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  user: IUserItem;
  onActivate: (walletAddress: string, isActive: boolean) => void;
  onChangeRole: (walletAddress: string, role: string) => void;
  onMakeOwner: (walletAddress: string, e: ChangeEvent<HTMLInputElement>) => void;
  refetch: () => void;
};

const UserEdit = ({
  open,
  onClose,
  user,
  onActivate,
  onChangeRole,
  onMakeOwner,
  refetch,
}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [role, setRole] = useState('');
  const { isOwner } = useRahatDonor();
  const [isOwnerState, setIsOwnerState] = useState<boolean | null>(null);

  const { isLoading, mutate } = useMutation({
    mutationFn: async (updateData) => {
      console.log('update data:', updateData);
      const response = await AdministrationService.update(user.id, updateData);
      return response.data;
    },
    onError: () => {
      enqueueSnackbar('Error updating user', { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('User updated successfully', { variant: 'success' });
      refetch();
      onClose();
    },
  });

  const UserSchema = Yup.object().shape({
    name: Yup.string().nullable().required('Name is required'),
    email: Yup.string().nullable().optional(),
    walletAddress: Yup.string().nullable().required('Wallet address is required'),
  });

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: '',
      email: '',
      walletAddress: '',
    }),
    []
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (user) {
      const defaultValuesKeys = Object.keys(defaultValues) as (keyof FormValues)[];
      const userKeys = Object.keys(user) as (keyof FormValues)[];

      const keysToSet = defaultValuesKeys.filter((key) => userKeys.includes(key));

      keysToSet.forEach((key) => {
        const value = user[key];
        const formKey = key as keyof FormValues;
        setValue(formKey, value as string);
      });
    }
  }, [defaultValues, user]);

  useEffect(() => {
    const fetchIsOwner = async () => {
      if (user) {
        const owner = await isOwner(user.walletAddress);
        setIsOwnerState(owner);
      }
    };
    fetchIsOwner();
  }, [isOwner, user, onMakeOwner]);

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

  const onSubmit = useCallback((data: any) => mutate(data), [mutate]);

  return (
    <Dialog open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Edit User Detail</DialogTitle>

        <DialogContent sx={{ color: 'text.secondary', minWidth: '500px' }}>
          <Stack spacing={2} paddingTop={2}>
            <RHFTextField name="name" label="Name" />
            <RHFTextField name="email" label="Email" />
            <RHFTextField name="walletAddress" label="Wallet Address" />
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
          <LoadingButton type="submit" variant="outlined" color="success" loading={isLoading}>
            Update User
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default UserEdit;
