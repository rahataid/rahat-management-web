import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  dashboard: icon('ic_dashboard'),
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
            title: 'test',
            path: paths.dashboard.user.list,
            icon: ICONS.dashboard,
          },
          {
            title: 'transactions',
            path: paths.dashboard.general.transactions.list,
            icon: ICONS.dashboard,
          },
        ],
      },

      // DEMO MENU STATES
    ],
    []
  );

  return data;
}
