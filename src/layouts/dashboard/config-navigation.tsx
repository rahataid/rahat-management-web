import Iconify from '@components/iconify/iconify';
import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
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
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: 'overview',
        items: [
          {
            title: 'dashboard',
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
          {
            title: 'projects',
            path: paths.dashboard.general.projects.list,
            icon: ICONS.projects,
          },
          {
            title: 'transactions',
            path: paths.dashboard.general.transactions.list,
            icon: ICONS.transactions,
          },
          {
            title: 'beneficiaries',
            path: paths.dashboard.general.beneficiaries.list,
            icon: ICONS.beneficiaries,
          },
          {
            title: 'Photo Gallery',
            path: paths.dashboard.general.photoGallery,
            icon: ICONS.gallery,
          },
          {
            title: 'Vendors',
            path: paths.dashboard.general.vendors.list,
            icon: ICONS.vendors,
          },
          {
            title: 'Campaigns',
            path: paths.dashboard.general.campaigns.list,
            icon: ICONS.campaigns,
            children: [
              {
                title: 'List',
                path: paths.dashboard.general.campaigns.list,
                icon: icon('cil:list'),
              },
            ],
          },
        ],
      },
      {
        subheader: 'administration',

        items: [
          {
            title: 'users',
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
