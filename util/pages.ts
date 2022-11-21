export type Page = {
    name: string;
    path: string;
};

export const Pages: Page[] = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "People",
        path: "/people",
    },
    {
        name: "Projects",
        path: "/projects",
    },
];
