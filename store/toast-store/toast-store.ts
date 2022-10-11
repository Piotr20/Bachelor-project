import create from "zustand";
import { Status, ToastPosition } from "~/models";
export type ToastMessage = {
  text: string;
  status: Status;
};
type ToastState = {
  messages: Array<ToastMessage>;
  visible: boolean;
  durationInSeconds: number;
  position: ToastPosition;
  fadeIn: boolean;
  toast: ToastMessage;
  showToast: (
    message: string,
    status: Status,
    position?: ToastPosition
  ) => void;
  hideToast: () => void;
};

export const useToastStore = create<ToastState>((set, get) => ({
  messages: [],
  visible: true,
  status: "default",
  position: "bottom-center",
  fadeIn: false,
  toast: { text: "test", status: "default" },
  durationInSeconds: 4, // TODO: do we need to declare in a config file?
  showToast: (msg: string, newStatus: Status, newPosition?: ToastPosition) => {
    set((state) => ({
      ...state,
      messages: [...state.messages, { text: msg, status: newStatus }],
      visible: true,
      status: newStatus,
      position: newPosition ?? "bottom-center",
      fadeIn: true,
    }));
  },
  hideToast: () => {
    set((state) => {
      return {
        ...state,
        visible: false,
        messages: [],
        status: "default",
        position: "bottom-center",
      };
    });
  },
}));
