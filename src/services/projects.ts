import { axiosInstance, endpoints } from '@utils/axios';
import { IProjectApiFilters, IProjectCreateItem, IProjectUpdateItem } from 'src/types/project';

const ProjectsService = {
  list: (params?: IProjectApiFilters) => axiosInstance.get(endpoints.projects.list, { params }),
  listbyId: (id:number ) => axiosInstance.get(endpoints.projects.listbyId(id)),
  create: (data: IProjectCreateItem) => axiosInstance.post(endpoints.projects.create, { ...data }),
  update: ({ id, ...rest }: IProjectUpdateItem) =>
    axiosInstance.patch(endpoints.projects.update(id), { ...rest }),
  // delete: (uuid: string) => axiosInstance.delete(endpoints.projects.delete(uuid)),

  details: (contractAddress: string) =>
    axiosInstance.get(endpoints.projects.details(contractAddress)),
};

export const ProjectBeneficiariesService = {
  list: (contractAddress: string) =>
    axiosInstance.get(endpoints.projectBeneficiaries.list(contractAddress)),
};

export default ProjectsService;
