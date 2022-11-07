import create from "zustand";
import { Project, Skill, User } from "~/models";

type NavState = {
    showNav: boolean;
    toggleNav: Function;
    openSlider: boolean | undefined;
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
