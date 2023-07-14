export enum PROJECT_TYPE {
  ANTICIPATORY_ACTION = 'ACTIVE',
  CRISIS_RESPONSE = 'INACTIVE',
  MICRO_LOANS = 'MICRO_LOANS',
  SOCIAL_PROTECTION = 'SOCIAL_PROTECTION',
  SPECIAL_PROJECT = 'SPECIAL_PROJECT',
  UBI = 'UBI',
}

export type IProjectItem = {
  id: number;
  title: string;
  budget: number;
  createdAt: string;
  image: string;
  tokenIssued?: number,
  tokenRedeemed?: number,
  projectManager?: string,
  locations?: string,
};

export type IProjectsList = IProjectItem[];

export type IProjectCreateItem = {
  name: string;
  location: string;
  projectManager: string;
  description: string;
  startDate: string;
  endDate: string;
  projectType: string;
};

export type IProjectTypeFilterOptions = string[];
