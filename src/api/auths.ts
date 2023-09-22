import AuthService from '@services/auths';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

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

  return useMutation(
    ['login/verify'],
    async ({ email, otp }: { email: string; otp: string }) => {
      const req = await AuthService.login({ email, otp });

      return req.data;
    },
    {
      onSuccess: (data) => {
        notify.enqueueSnackbar('Login successful', { variant: 'success' });
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

export const useRegister = ()=>{
  const notify = useSnackbar();
 
    return useMutation(
      ['register'],
      async({name,email,walletAddress}:{name:string;email:string;walletAddress:string})=>{
        const res = await AuthService.register({name,email,walletAddress}) ;
        console.log(res)
        return res?.data
      } ,
      {
        onSuccess: (data) => {
          notify.enqueueSnackbar('Successfully Register', { variant: 'success' });
          return data;
        },
        onError: (error) => {
          console.log(error)
          notify.enqueueSnackbar( error?.message ||'Something went wrong', {
            variant: 'error',
          });
          return error;
        },
      }
    )

}
