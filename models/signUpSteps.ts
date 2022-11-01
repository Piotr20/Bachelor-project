import { User } from "./user";

export type StepProps = {
    user: User;
    setUser: (data: User) => void;
};
