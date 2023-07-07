export type IProjectItem = {
  id: number;
  title: string;
  budget: number,
  createdAt: string,
  image?: string;
  tokenIssued?: number,
  tokenRedeemed?: number,
  projectManager?: string,
  locations?: string,
};

export type IProjectsList = IProjectItem[];
