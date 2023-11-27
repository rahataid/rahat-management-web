import ProjectsService, { ProjectBeneficiariesService } from '@services/projects';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { IBeneficiaryApiFilters } from 'src/types/beneficiaries';
import {
  IProjectApiFilters,
  IProjectBeneficiariesHookReturn,
  IProjectBeneficiariesItem,
  IProjectDetailsHookReturn,
  ProjectsListHookReturn,
} from 'src/types/project';

export function useProjects(params?: IProjectApiFilters): ProjectsListHookReturn {
  const { data, isLoading, error } = useQuery(['projects'], async () => {
    const res = await ProjectsService.list(params);
    return res;
  });

  const projects = useMemo(() => data?.data?.rows || [], [data?.data?.rows]);
  const meta = useMemo(() => data?.data?.meta || {}, [data?.data?.meta]);

  return {
    // TEMP for stage
    // projects: ProjectList,
    projects,
    loading: isLoading,
    error,
    meta,
  };
}

export function useProject(address: string): IProjectDetailsHookReturn {
  const { data, isLoading, error } = useQuery(['project', address], async () => {
    const res = await ProjectsService.details(address);
    return res;
  });

  const project = useMemo(() => data?.data || {}, [data?.data]);

  return {
    project,
    loading: isLoading,
    error,
  };
}

export function useProjectBeneficiaries(address: string,params?: IBeneficiaryApiFilters): IProjectBeneficiariesHookReturn {
  const { data, isLoading, error } = useQuery(['projectbenificiaries', address,params], async () => {
    const res = await ProjectBeneficiariesService.list(address,params);
    return res;
  });

  const beneficiaries = useMemo(
    () =>
      data?.data?.rows.map((b: IProjectBeneficiariesItem) => ({
        ...b,
        isApproved: b.isApproved ? 'Approved' : 'Not Approved',
      })) || [],
    [data?.data?.rows]
  );
  const meta = useMemo(() => data?.data?.meta || {}, [data?.data?.meta]);

  return {
    beneficiaries,
    loading: isLoading,
    error,
    meta,
  };
}

export function useRemoveBeneficiaries(address: string) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ['projects/removebenificiaries'],
    async (createData: string[]) => {
      const response = await ProjectsService.removeBeneficiariesFromProject(address, createData);
      return response.data;
    },
    {
      onError: () => {
        enqueueSnackbar('Error Removing Beneficiaries', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('Beneficiaries disconnect Succesfully', { variant: 'success' });
        queryClient.invalidateQueries(['projectbenificiaries']);
      },
    }
  );
}
export function useProjectRemoveCampaign() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    ['project/campaign/remove'],
    async ({ address, ids }: { address: string; ids: number[] }) => {
      const response = await ProjectsService.removeCampaignFromProject(address, ids);
      return response.data;
    },
    {
      onError: () => {
        enqueueSnackbar('Error Removing Campaigns', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('Campaign Removed Successfully', { variant: 'success' });
        queryClient.invalidateQueries(['project']);
      },
    }
  );
}
