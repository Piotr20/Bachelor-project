import create from "zustand";
import { User } from "~/models";

type UserState = {
    user: User;
    openProfile: boolean;
    editMode: boolean;
    setEditMode: (data: boolean) => void;
    setOpenProfile: (data: boolean) => void;
    setUserData: (data: User) => void;
};

export const useUserStore = create<UserState>((set) => ({
    user: undefined,
    openProfile: false,
    editMode: false,
    setUserData: (data: User) =>
        set((state) => ({
            user: data,
        })),
    setOpenProfile: (data: boolean) =>
        set((state) => ({
            openProfile: data,
        })),
    setEditMode: (data: boolean) =>
        set((state) => ({
            editMode: data,
        })),
}));
