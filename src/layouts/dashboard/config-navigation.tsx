import Iconify from '@components/iconify/iconify';
import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
// components

// ----------------------------------------------------------------------

const icon = (name: string) => (
  // <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  <Iconify icon={name} />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  dashboard: icon('akar-icons:dashboard'),
  gallery: icon('material-symbols:gallery-thumbnail-outline-rounded'),
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
            icon: ICONS.dashboard,
          },
          {
            title: 'Photo Gallery',
            path: paths.dashboard.general.photoGallery,
            icon: ICONS.gallery,
          },
        ],
      },

      // DEMO MENU STATES
    ],
    []
  );

  return data;
}
