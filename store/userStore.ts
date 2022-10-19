import create from "zustand";
import { User } from "~/models";

type UserState = {
    user: User;
    setUserData: (data: User) => void;
};

export const useUserStore = create<UserState>((set) => ({
    user: undefined,
    setUserData: (data: User) =>
        set(() => ({
            user: data,
        })),
}));
