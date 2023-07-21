import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import * as Yup from 'yup';

interface TokenValue {
  token: string;
}

type Props = {
  open: boolean;
  onClose: () => void;
  onOk: (v: any) => void;
};

const CreateTokenModal = ({ open, onClose, onOk }: Props) => {
  const FormSchema = Yup.object().shape({
    token: Yup.string().required('Token is required'),
  });
  const methods = useForm<TokenValue>({
    resolver: yupResolver(FormSchema),
    // defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isLoading, isSubmitSuccessful },
  } = methods;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Token</DialogTitle>

      <DialogContent sx={{ color: 'text.secondary' }}>
        Enter Token To Create in the project
      </DialogContent>

      <Stack sx={{ p: 2 }} spacing={5}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onOk)}>
          <RHFTextField name="token" label="Token" color="success" />
        </FormProvider>
      </Stack>
      <DialogActions>
        <Button variant="text" color="success" onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton variant="text" type="submit" autoFocus loading={isLoading}>
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTokenModal;
