import {
  IProjectItem,
  IProjectsList,
  IProjectTypeFilterOptions,
  PROJECT_TYPE,
} from 'src/types/project';

export const projectsList: IProjectsList = [
  {
    id: 1,
    title: 'Chitwan Chepang Community',
    budget: 5000,
    createdAt: '15 Jul 2023',
    image:
      'https://assets.rumsan.com/rahat/communities/0xa0c02a95B10e1042a0aBF6c5F5F75b4121DD2C6e/QmZDWQ7AAx8k2GTGKxbfztRA6cGwsf1VExcpmYmxEMeEPc',
  },
  {
    id: 2,
    title: 'Daily Wage Earners',
    budget: 25000,
    createdAt: '15 Jul 2023',
    image:
      'https://assets.rumsan.com/rahat/communities/0xDF5f2cEd2eaD801b600a386542537fA2BA2B486A/QmYG1m5PbfSyb8dgvgcAywMrPiDzEXbdQ4AAjEvot1fFnK',
  },
  {
    id: 3,
    title: 'Dumre Chepang community',
    budget: 23000,
    createdAt: '15 Jul 2023',
    image:
      'https://assets.rumsan.com/rahat/communities/0x30226bb1d3ca4Fd64b24DB8b82E0a0F4dCDE01cf/QmTM5Rjea4b5QmpecrwQUS595MfYZPFAQQL8PJLJPWvWZQ',
  },
  {
    id: 4,
    title: 'Dumre Covid Victims',
    budget: 60000,
    createdAt: '15 Jul 2023',
    image:
      'https://assets.rumsan.com/rahat/communities/0x9CD0C3Fb109e8165e8327aCBc054458Ab60837Be/QmcBEX62sf8cNyzGgpKZZBpXa4qs3MuezQwEK46upZ3t65',
  },
  {
    id: 5,
    title: 'Flood Victims',
    budget: 13000,
    createdAt: '15 Jul 2023',
    image:
      'https://assets.rumsan.com/rahat/communities/0xdB79Fd17CDb80F17cB3EFce24F7b5dF67544D084/QmSWQcJF3i2DBGGFeJV3pRUiDe8ffCv22zfy6CxT78JPFg',
  },
  {
    id: 6,
    title: 'Godwari PwD Community',
    budget: 54000,
    createdAt: '15 Jul 2023',
    image:
      'https://assets.rumsan.com/rahat/communities/0x31C24d29036FEFac9Bf8cA2f399400037b8b072F/QmSRcUor2q24QEpgaXFhJcNKiV7yD5YTBms1Npt59ALcim',
  },
];

export const project: IProjectItem = {
  id: 1,
  title: 'Project 1',
  image: 'sdad',
  budget: 5000,
  createdAt: '15 Jul 2023',
};

export const projectTypeOptions: IProjectTypeFilterOptions = Object.values(
  PROJECT_TYPE
) as string[];
