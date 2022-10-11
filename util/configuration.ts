import { TLASvg } from "~/components/svg-icon";

export type Configuration = {
    pages: Array<Page>;
};
export type Page = {
    name: string;
    url: string;
    icon: keyof typeof TLASvg;
    subpages?: Array<Subpage>;
};
export type Subpage = {
    name: string;
    url: string;
};

export const configuration: Configuration = {
    pages: [
        {
            name: "Home",
            url: "/",
            icon: "circlePlus",
        },
        {
            name: "Projects",
            url: "/projects",
            icon: "errorTextIcon",
            subpages: [
                { name: "All", url: "/all" },
                { name: "Favorite", url: "/favorite" },
            ],
        },
        {
            name: "Profile",
            url: "/profile",
            icon: "errorTextIcon",
        },
        {
            name: "Employees",
            url: "/employees",
            icon: "circlePlus",
        },
    ],
};
