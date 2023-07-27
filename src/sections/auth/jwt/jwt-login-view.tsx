'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
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
import Link from '@mui/material/Link';
import { paths } from '@routes/paths';
import MetaMaskCard, {
  MetamaskCardWalletProps,
} from '@web3/components/connectorCards/MetaMaskCard';
import { hooks as metamaskHooks } from '@web3/connectors/metaMask';

import { RouterLink } from '@routes/components';
import { setWalletName } from '@utils/storage-available';
import { useWeb3React } from '@web3-react/core';
import { getName } from '@web3/utils';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import useAppStore from 'src/store/app';
import useAuthStore from 'src/store/auths';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { connector } = useWeb3React();
  const isMetamaskActive = metamaskHooks.useIsActive();
  const account = metamaskHooks.useAccount();

  const { login, loginWallet, user, error } = useAuthStore((state) => ({
    login: state.login,
    loginWallet: state.loginWallet,
    user: state.user,
    error: state.error,
  }));
  const networkSettings = useAppStore((state) => state.blockchain);

  const [userNotRegistered, setUserNotRegistered] = useState(false);

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
    } catch (err) {
      console.error(err);
      reset();
      setErrorMsg(typeof err === 'string' ? err : err.message);
    }
  });

  const onWalletButtonClick = useCallback(
    async ({ connector: metamaskConnector }: MetamaskCardWalletProps) => {
      if (isMetamaskActive) {
        if (metamaskConnector?.deactivate) {
          metamaskConnector.deactivate();
        } else {
          metamaskConnector.resetState();
        }
        return;
      }
      await metamaskConnector.activate(networkSettings);
    },
    [isMetamaskActive, networkSettings]
  );

  useEffect(() => {
    if (account && !user) {
      loginWallet(account);
    }
  }, [account, loginWallet, returnTo, router, user]);

  useEffect(() => {
    if (user && connector) {
      setWalletName(getName(connector));
      router.push(returnTo || PATH_AFTER_LOGIN);
    }
    if (error?.statusCode === 404) {
      setUserNotRegistered(true);
    }
  }, [user, returnTo, router, error?.statusCode, connector]);

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Rahat</Typography>
    </Stack>
  );

  const renderWalletLogin = (
    <Stack spacing={0.5}>
      {!!error && isMetamaskActive && <Alert severity="error">{error.message}</Alert>}

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

      {userNotRegistered && (
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link component={RouterLink} href={paths.auth.register} variant="subtitle2">
            Create an account
          </Link>
        </Stack>
      )}
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
