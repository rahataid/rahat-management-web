import { axiosInstance, endpoints } from '@utils/axios';
import { IBeneficiaryApiFilters } from 'src/types/beneficiaries';
import { IProjectApiFilters, IProjectCreateItem, IProjectUpdateItem } from 'src/types/project';

const ProjectsService = {
  list: (params?: IProjectApiFilters) => axiosInstance.get(endpoints.projects.list, { params }),
  create: (data: IProjectCreateItem) => axiosInstance.post(endpoints.projects.create, { ...data }),
  update: (address: string, data: IProjectUpdateItem) =>
    axiosInstance.patch(endpoints.projects.update(address), { ...data }),
  updateCampaign: (address: string, id: number) =>
    axiosInstance.patch(endpoints.projects.updateCampaign(address), { id }),
  removeCampaignFromProject: (address: string, id: number[]) =>
    axiosInstance.patch(endpoints.projects.removeCampaignFromProject(address), id),
  // delete: (uuid: string) => axiosInstance.delete(endpoints.projects.delete(uuid)),
  removeBeneficiariesFromProject:(contractAddress:string, beneficiaries:string[])=> axiosInstance.patch(endpoints.projects.beneficiaries.remove(contractAddress),beneficiaries),
  details: (contractAddress: string) =>
    axiosInstance.get(endpoints.projects.details(contractAddress)),
};

export const ProjectBeneficiariesService = {
  list: (contractAddress: string,params?: IBeneficiaryApiFilters) =>
    axiosInstance.get(endpoints.projects.beneficiaries.list(contractAddress),{ params }),
};

export default ProjectsService;
