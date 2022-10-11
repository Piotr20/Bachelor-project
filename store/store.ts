import create from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { userData, userSchema } from "~/util/user";

type AppState = {
    showNav: boolean;
    toggleNav: Function;
};
type AuthState = {
    user?: userSchema;
    setUserData: (userData?: userSchema) => void;
};
type MessageState = {
    messageText?: string;
    messageType?: string;
    isToast?: boolean;
    setMessage: (type?: string, text?: string, isToast?: boolean) => void;
};

export const useNavStore = create<AppState>((set) => ({
    showNav: false,
    toggleNav: () =>
        set((state) => ({
            showNav: !state.showNav,
        })),
}));

export const useAuthStore = create<AuthState>((set) => ({
    user: undefined,
    setUserData: (userData) =>
        set((state) => ({
            user: userData,
        })),
}));

export const useMessageStore = create<MessageState>((set) => ({
    messageText: undefined,
    messageType: undefined,
    isToast: undefined,
    setMessage: (type, text, isToast) =>
        set((state) => ({
            messageText: text,
            messageType: type,
            isToast: isToast,
        })),
}));
