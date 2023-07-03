'use client';

// sections
import { AuthGuard } from '@guard';
import DashboardLayout from '@layouts/dashboard/layout';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Rahat',
};

export default function HomePage() {
  return (
    <AuthGuard>
      <DashboardLayout>Dashboard</DashboardLayout>
    </AuthGuard>
  );
}
