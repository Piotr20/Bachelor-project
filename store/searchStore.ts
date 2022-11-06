import create from "zustand";
import { Project, Skill, User } from "~/models";

type SearchStoreState = {
    searchResults: (User[] & Project[] & Skill[]) | undefined;
    setSearchResults: (data: User[] & Project[] & Skill[]) => void;
};

export const useSearchStore = create<SearchStoreState>((set) => ({
    searchResults: undefined,
    setSearchResults: (data: User[] & Project[] & Skill[]) =>
        set((state) => ({
            searchResults: data,
        })),
}));
