import create from "zustand";

type NavState = {
    showNav: boolean;
    toggleNav: Function;
};

export const useNavStore = create<NavState>((set) => ({
    showNav: false,
    toggleNav: () =>
        set((state) => ({
            showNav: !state.showNav,
        })),
}));
