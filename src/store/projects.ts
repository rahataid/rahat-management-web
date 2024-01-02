import { IProjectChainData } from 'src/types/contract-hooks/useProject';
import { create } from 'zustand';

export type ProjectStateType = {
  chainData: IProjectChainData;
};

type ProjectActionsType = {
  setChainData: (chainData: IProjectChainData) => void;
};

export type ProjectStoreType = ProjectStateType & ProjectActionsType;

const useProjectStore = create<ProjectStoreType>((set) => ({
  chainData: {
    balance: 0,
    tokenAllowance: 0,
    isLocked: false,
    isApproved: false,
    distributed: 0,
  },
  setChainData: (chainData: IProjectChainData) => {
    set({ chainData });
  },
}));
export default useProjectStore;
