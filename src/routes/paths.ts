// utils
import { paramCase } from 'src/utils/change-case';

// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
  TRANSACTIONS: '/transactions',
  BENEFICIARIES: '/beneficiaries',
  PROJECTS: '/projects',
  PHOTO_GALLERY: '/photo-gallery',
  VENDORS: '/vendors',
};

// ----------------------------------------------------------------------

export const paths = {
  page403: '/403',
  page404: '/404',
  page500: '/500',

  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/jwt/login`,
  },

  dashboard: {
    root: ROOTS.DASHBOARD,

    general: {
      app: `${ROOTS.DASHBOARD}/app`,
      projects: {
        list: `${ROOTS.PROJECTS}`,
      },
      photoGallery: `${ROOTS.PHOTO_GALLERY}`,
      vendors: {
        list: `${ROOTS.VENDORS}`,
        details: (address: string) => `${ROOTS.VENDORS}/${address}`,
      },

      transactions: {
        list: `${ROOTS.TRANSACTIONS}`,
        details: (hash: string) => `${ROOTS.TRANSACTIONS}/${paramCase(hash)}`,
      },
      beneficiaries: {
        list: `${ROOTS.BENEFICIARIES}`,
      },
    },
  },
};
