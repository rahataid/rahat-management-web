import Iconify from '@components/iconify/iconify';
import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
import useAuthStore from 'src/store/auths';
// locales
// components

// ----------------------------------------------------------------------

const icon = (name: string) => <Iconify icon={name} />;

const ICONS = {
  dashboard: icon('material-symbols:dashboard-outline-rounded'),
  projects: icon('octicon:project-16'),
  transactions: icon('solar:hand-money-outline'),
  beneficiaries: icon('ion:people-outline'),
  vendors: icon('material-symbols:anchor'),
  gallery: icon('material-symbols:gallery-thumbnail-outline-rounded'),
  settings: icon('fluent:settings-24-regular'),
  users: icon('la:users'),
  campaigns: icon('carbon:communication-unified'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const roles = useAuthStore((state) => state.role);
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: 'overview',
        show: true,
        items: [
          {
            title: 'dashboard',
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
            show: true,
          },
          {
            title: 'projects',
            path: paths.dashboard.general.projects.list,
            icon: ICONS.projects,
            show: true,
          },
          {
            title: 'transactions',
            path: paths.dashboard.general.transactions.list,
            icon: ICONS.transactions,
            show: true,
          },
          {
            title: 'beneficiaries',
            path: paths.dashboard.general.beneficiaries.list,
            icon: ICONS.beneficiaries,
            show: true,
          },
          {
            title: 'Photo Gallery',
            path: paths.dashboard.general.photoGallery,
            icon: ICONS.gallery,
            show: true,
          },
          {
            title: 'Vendors',
            path: paths.dashboard.general.vendors.list,
            icon: ICONS.vendors,
            show: true,
          },
          {
            title: 'Campaigns',
            path: paths.dashboard.general.campaigns.list,
            icon: ICONS.campaigns,
            show: true,

            children: [
              {
                title: 'List',
                path: paths.dashboard.general.campaigns.list,
                icon: icon('cil:list'),
                show: true,
              },
              {
                title: 'Call Logs',
                path: paths.dashboard.general.campaigns.callLogs,
                icon: icon('material-symbols:call'),
                show: true,
              },
            ],
          },
        ],
      },
      {
        subheader: 'administration',
        show: roles.isAdmin,

        items: [
          {
            title: 'users',
            show: roles.isAdmin,
            path: paths.dashboard.administration.users.list,
            icon: ICONS.users,
          },
        ],
      },

      // DEMO MENU STATES
    ],
    []
  );

  return data;
}
