import { createStore } from '@utils/store-tools';
import { IBeneficiaryChainData } from 'src/types/contract-hooks/useProject';

export type BeneficiaryStateType = {
  chainData: IBeneficiaryChainData;
};

type BeneficiaryActionsType = {
  setChainData: (chainData: IBeneficiaryChainData) => void;
};

export type BeneficiaryStoreType = BeneficiaryStateType & BeneficiaryActionsType;

const useBeneficiaryStore = createStore<BeneficiaryStoreType>(
  (set) => ({
    chainData: {
      isBeneficiary: null,
      claimed: 0,
      balance: 0,
    },
    setChainData: (chainData: IBeneficiaryChainData) => {
      set({ chainData });
    },
  }),
  {
    devtoolsEnabled: true,
  }
);

export default useBeneficiaryStore;
