'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
import { useRouter, useSearchParams } from 'src/routes/hook';
// config
// hooks
// auth
// components
import Iconify from '@components/iconify/iconify';
import { PATH_AFTER_LOGIN } from '@config';
import { Divider } from '@mui/material';
import MetaMaskCard, {
  MetamaskCardWalletProps,
} from '@web3/components/connectorCards/MetaMaskCard';
import { hooks as metamaskHooks } from '@web3/connectors/metaMask';
import useAuthStore from 'src/auth/context/jwt/store';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const isMetamaskActive = metamaskHooks.useIsActive();
  const account = metamaskHooks.useAccount();
  const { login, loginWallet } = useAuthStore((state) => ({
    login: state.login,
    loginWallet: state.loginWallet,
  }));

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    email: 'donor@mailinator.com',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      login(data.email);
      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const onWalletButtonClick = async ({ connector, provider }: MetamaskCardWalletProps) => {
    if (isMetamaskActive) {
      if (connector?.deactivate) {
        connector.deactivate();
      } else {
        connector.resetState();
      }
      return;
    }
    await connector.activate({
      chainId: 1337,
      rpcUrls: ['http://localhost:8545'],
      chainName: 'Localhost',
      nativeCurrency: {
        name: 'ETH',
        decimals: 18,
        symbol: 'ETH',
      },
    });
    console.log('account', account);
    // loginWallet(account)
  };

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Rahat</Typography>
    </Stack>
  );

  const renderWalletLogin = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <MetaMaskCard
        component={LoadingButton}
        title="Metamask"
        description="MetaMask is the leading self-custodial wallet. The safe and simple way to access blockchain applications and web3."
        walletAvatar="logos:metamask-icon"
        onClick={onWalletButtonClick}
        props={{
          fullWidth: true,
          color: 'inherit',
          size: 'large',
          variant: 'outlined',
          sx: {
            mt: 2,
          },
          startIcon: <Iconify icon="logos:metamask-icon" />,
        }}
      >
        {isMetamaskActive ? 'Disconnect Metamask' : 'Login with Metamask'}
      </MetaMaskCard>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="email" label="Email address" />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  const dividerView = (
    <Stack mt={2}>
      <Divider>
        <Typography textTransform="uppercase">or</Typography>
      </Divider>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}

      {dividerView}

      {renderWalletLogin}
    </FormProvider>
  );
}
