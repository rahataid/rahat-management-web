// routes
import { paths } from '@routes/paths';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'src/routes/hook';
import useAuthStore from '../context/jwt/store';
//

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const router = useRouter();

  const authenticated = useAuthStore((state) => state.isAuthenticated);

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(paths.dashboard.root);
    }
  }, [authenticated, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
