export type IProjectItem = {
  id: number;
  title: string;
  budget: number,
  createdAt: string,
  image?: string;
};

export type IProjectsList = IProjectItem[];
