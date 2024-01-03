'use client';

import { useRouter } from '@routes/hook';
import { useEffect } from 'react';

// sections
import { paths } from '@routes/paths';
import useAuthStore from 'src/store/auths';

// ----------------------------------------------------------------------

export default function HomePage() {
  const router = useRouter();
  const { tokens } = useAuthStore.getState();
  useEffect(() => {
    const session = tokens.access_token;

    if (!session) {
      router.push(paths.auth.login);
    } else {
      router.push(paths.dashboard.root);
    }
  }, []);
}
