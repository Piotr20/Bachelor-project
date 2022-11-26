import create from "zustand";
import { Project, Skill, User } from "~/models";

type NavState = {
    openSlider: boolean | undefined;
    sliderData: User | Project | Skill | undefined;
    toggleSlider: Function;
    sliderDataType: "project" | "skill" | "person" | undefined;
    breadcrumbData?:
        | (
              | (User & {
                    type?: "person";
                })
              | undefined
          )
        | (
              | (Project & {
                    type?: "project";
                })
              | undefined
          )
        | (
              | (Skill & {
                    type?: "skill";
                })
              | undefined
          );
    setDataInSlider: (data: User | Project | Skill) => void;
    setOpenSlider: (open: boolean) => void;
    setDataType: (data: "project" | "skill" | "person" | undefined) => void;
    setBreadcrumbData: (data: any) => void;
};

export const useNavStore = create<NavState>((set) => ({
    openSlider: false,
    sliderData: undefined,
    sliderDataType: undefined,
    breadcrumbData: undefined,
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
    setBreadcrumbData: (
        data: (
            | (User & {
                  type: "person";
              })
            | undefined
        ) &
            (
                | (Project & {
                      type: "project";
                  })
                | undefined
            ) &
            (
                | (Skill & {
                      type: "skill";
                  })
                | undefined
            )
    ) =>
        set(() => ({
            breadcrumbData: data,
        })),
}));
