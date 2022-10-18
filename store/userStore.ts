import create from "zustand";

type UserState = {
    user: any;
    setUserData: (data: any) => void;
};

export const useUserStore = create<UserState>((set) => ({
    user: {},
    setUserData: () =>
        set((state) => ({
            user: state,
        })),
}));
