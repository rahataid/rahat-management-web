import { axiosInstance, endpoints } from '@utils/axios';
import { IProjectApiFilters, IProjectCreateItem } from 'src/types/project';

const ProjectsService = {
  list: (params?: IProjectApiFilters) => axiosInstance.get(endpoints.projects.list, { params }),
  create: (data: IProjectCreateItem) => axiosInstance.post(endpoints.projects.create, { ...data }),
  // update: ({ uuid, ...rest }: Partial<IProjectCreateItem>) =>
  //   axiosInstance.put(endpoints.projects.update(uuid), { ...rest }),
  // delete: (uuid: string) => axiosInstance.delete(endpoints.projects.delete(uuid)),

  details: (contractAddress: string) =>
    axiosInstance.get(endpoints.projects.details(contractAddress)),
};

export const ProjectBeneficiariesService = {
  list: (contractAddress: string) =>
    axiosInstance.get(endpoints.projectBeneficiaries.list(contractAddress)),
};

export default ProjectsService;
