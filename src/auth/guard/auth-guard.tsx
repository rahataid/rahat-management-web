'use client';

import { useCallback, useEffect, useState } from 'react';
// routes
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
//
import { SplashScreen } from '@components/loading-screen';
import { useWeb3React } from '@web3-react/core';
import useAuthStore from 'src/store/auths';

// ----------------------------------------------------------------------

const loginPaths: Record<string, string> = {
  jwt: paths.auth.login,
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const authenticated = useAuthStore((state) => state.isAuthenticated);
  const initialized = useAuthStore((state) => state.isInitialized);
  const { isActivating } = useWeb3React();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({ returnTo: window.location.pathname }).toString();
      console.log('searchParams', searchParams);

      const loginPath = loginPaths.jwt;

      const href = `${loginPath}?${searchParams}`;

      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }
  if (isActivating && !initialized) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
