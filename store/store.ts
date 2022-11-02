import create from "zustand";
import { persist } from "zustand/middleware";
import { Project, Skill, User } from "~/models";

type NavState = {
    showNav: boolean;
    toggleNav: Function;
    openSlider: boolean;
    sliderData: User | Project | Skill | undefined;
    toggleSlider: Function;
    setDataInSlider: (data: User | Project | Skill) => void;
    setOpenSlider: (open: boolean) => void;
};

export const useNavStore = create<NavState>((set) => ({
    showNav: false,
    openSlider: false,
    sliderData: undefined,
    toggleNav: () =>
        set((state) => ({
            showNav: !state.showNav,
        })),
    setOpenSlider: (open) =>
        set((state) => ({
            openSlider: open,
        })),
    toggleSlider: () =>
        set((state) => ({
            openSlider: !state.openSlider,
        })),
    setDataInSlider: (data: User | Project | Skill) =>
        set(() => ({
            sliderData: data,
        })),
}));

export const useSliderStore = create<any>(
    persist(
        (set, get) => ({
            openSlider: false,
            toggleSlider: () => set({ openSlider: get().openSlider }),
        }),
        {
            name: "openSlider",
        }
    )
);
