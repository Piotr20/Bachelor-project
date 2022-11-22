export type Page = {
    name: string;
    path: string;
    icon: "home" | "people" | "projects";
};

export const Pages: Page[] = [
    {
        name: "Home",
        path: "/",
        icon: "home",
    },
    {
        name: "People",
        path: "/people",
        icon: "people",
    },
    {
        name: "Projects",
        path: "/projects",
        icon: "projects",
    },
];
