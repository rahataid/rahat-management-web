import AuthService from '@services/auths';
import { useMutation } from '@tanstack/react-query';
import { setSession } from '@utils/session';
import { setUser } from '@utils/storage-available';
import { useSnackbar } from 'notistack';
import useAuthStore from 'src/store/auths';

export const useRequestOtp = () => {
  const notify = useSnackbar();
  return useMutation(
    ['login/otp'],
    async ({ email }: { email: string }) => {
      const req = await AuthService.sendOtp(email);
      return req.data;
    },
    {
      onSuccess: (data) => {
        notify.enqueueSnackbar('OTP sent successfully', { variant: 'success' });
      },
      onError: (error) => {
        notify.enqueueSnackbar(error?.response?.data?.message || 'Something went wrong', {
          variant: 'error',
        });
      },
    }
  );
};
export const useLogin = () => {
  const notify = useSnackbar();
  const setUserinStore = useAuthStore((state) => state.setUser);

  return useMutation(
    ['login/verify'],
    async ({ email, otp }: { email: string; otp: string }) => {
      const req = await AuthService.login({ email, otp });

      return req.data;
    },
    {
      onSuccess: (data) => {
        notify.enqueueSnackbar('Login successful', { variant: 'success' });
        const { refresh_token, access_token, ...user } = data;
        setUser(user);
        setUserinStore(user);
        setSession(access_token);
        return data;
      },
      onError: (error) => {
        notify.enqueueSnackbar(error?.response?.data?.message || 'Something went wrong', {
          variant: 'error',
        });
        return error;
      },
    }
  );
};
