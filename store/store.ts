import create from "zustand";
import { Project, Skill, User } from "~/models";

type NavState = {
    openSlider: boolean | undefined;
    sliderData: User | Project | Skill | undefined;
    toggleSlider: Function;
    sliderDataType: "project" | "skill" | "person" | undefined;
    setDataInSlider: (data: User | Project | Skill) => void;
    setOpenSlider: (open: boolean) => void;
    setDataType: (data: "project" | "skill" | "person" | undefined) => void;
};

export const useNavStore = create<NavState>((set) => ({
    openSlider: false,
    sliderData: undefined,
    sliderDataType: undefined,
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
    setDataType: (data: "project" | "skill" | "person" | undefined) =>
        set(() => ({
            sliderDataType: data,
        })),
}));
