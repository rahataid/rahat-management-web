import { create } from 'zustand';

export type AppStateType = {
  walletName: string | undefined;
};

type AppActionsType = {
  setWalletName: (value: string | undefined) => void;
};

export type AppStoreType = AppStateType & AppActionsType;

const useAppStore = create<AppStoreType>((set) => ({
  walletName: undefined,
  setWalletName: (walletName: string | undefined) => {
    set({ walletName });
  },
}));

export default useAppStore;
