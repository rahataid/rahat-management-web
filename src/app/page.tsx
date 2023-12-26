'use client';

import { useRouter } from '@routes/hook';
import { useEffect } from 'react';

// sections
import { paths } from '@routes/paths';

// ----------------------------------------------------------------------

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    const session = localStorage.getItem('accessToken');

    if (!session) {
      router.push(paths.auth.login);
    } else {
      router.push(paths.dashboard.root);
    }
  }, []);
}
