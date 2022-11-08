import { Project, User } from "~/models";

export const exampleDataUser: User = {
    _id: "6363ae253993f089ffe97334",
    name: "Aleks",
    email: "wytulana001@gmail.com",
    experienceYears: 10,
    department: "12345678",
    role: "Designer",
    location: "Aarhuus",
    projects: [
        {
            _id: "635795bc618db2baa2c443f9",
            name: "Montana",
            tag: "MTN",
            imageURL:
                "data:image/png;base64,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",
            startDate: "2021-03-01T00:00:00.000Z" as any,
            endDate: "2022-03-01T00:00:00.000Z" as any,
            people: ["634fe42fd8604cc58b9a73b1"],
            skills: [
                "63579141618db2baa2c443f2",
                "635792f5618db2baa2c443f3",
                "63579071618db2baa2c443f0",
                "634e6d9258a36ff9c6ad528e",
            ],
        },
        {
            _id: "635793fc618db2baa2c443f4",
            name: "Bog & idé",
            tag: "B&I",
            imageURL: "https://www.bog-ide.dk/assets/bog-og-ide.png",
            startDate: "2022-01-15T00:00:00.000Z",
            endDate: "2023-04-01T00:00:00.000Z",
            people: ["634d394693bce890a683167f"],
            skills: [
                "63579027618db2baa2c443ef",
                "63579071618db2baa2c443f0",
                "63579141618db2baa2c443f2",
            ],
        },
    ],
    skills: [
        {
            _id: "634e6d9258a36ff9c6ad528e",
            name: "Figma",
            imageURL:
                "https://assets.stickpng.com/images/62c6bc0beee9410fe137d91e.png",
            docs: "https://www.figma.com/",
        },
        {
            _id: "63579141618db2baa2c443f2",
            name: "TypeScript",
            imageURL:
                "https://www.tutorialsteacher.com/Content/images/home/typescript.svg",
            docs: "https://www.typescriptlang.org/",
        },
    ],
    imageURL:
        "https://media-exp1.licdn.com/dms/image/C4E03AQESdYwClrBdZw/profile-displayphoto-shrink_800_800/0/1603216082942?e=2147483647&v=beta&t=NyT8ZiZcpnvJd9IINgBgp_fSc8Dk2LIpQpu6jsyXA3g",
};

export const exampleDataProject: Project = {
    _id: "634d394693bce890a683167f",
    name: "Timelog Analyzer",
    tag: "TLA",
    imageURL:
        "https://www.timelog.com/media/754831/timelog_logo_with_payoff.png",
    startDate: "2022-08-08T00:00:00.000Z" as any,
    endDate: "2022-12-12T00:00:00.000Z" as any,
    people: [],
    skills: [
        {
            _id: "634e6d9258a36ff9c6ad528e",
            name: "Figma",
            imageURL:
                "https://assets.stickpng.com/images/62c6bc0beee9410fe137d91e.png",
            docs: "https://www.figma.com/",
        },
        {
            _id: "63579071618db2baa2c443f0",
            name: "Next.js",
            imageURL:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/800px-Nextjs-logo.svg.png",
            docs: "https://nextjs.org/docs",
        },
        {
            _id: "635790f1618db2baa2c443f1",
            name: "Styled Components",
            imageURL:
                "https://raw.githubusercontent.com/styled-components/brand/master/styled-components.png",
            docs: "https://styled-components.com/docs",
        },
    ],
};
