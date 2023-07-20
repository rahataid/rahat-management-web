import { axiosInstance, endpoints } from '@utils/axios';
import { IProjectApiFilters, IProjectCreateItem } from 'src/types/project';

const ProjectsService = {
  list: (params?: IProjectApiFilters) => axiosInstance.get(endpoints.projects.list, { params }),
  create: (data: IProjectCreateItem) => axiosInstance.post(endpoints.projects.create, { ...data }),

  details: (uuid: string) => axiosInstance.get(endpoints.projects.details(uuid)),
};

export default ProjectsService;
