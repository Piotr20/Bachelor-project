import { Project, Skill, User, UserSkill } from "~/models";
import Projects from "~/pages/projects";
import { skillsGroupType } from "~/pages/searchResults";
import { DOMAIN_NAME } from "~/util/env-variables";

export async function fetchSearchResults(category: "projects" | "skills" | "people" | "all") {
    switch (category) {
        case "people":
            const people = await fetchSingleEndpoint("user");
            return people;
        case "projects":
            const projects = await fetchSingleEndpoint("projects");
            return projects;
        case "skills":
            const skills = await fetchSingleEndpoint("skills");
            return skills;

        case "all":
            const all = await fetchAllEndpoints();
            return all;

        default:
            break;
    }
}

export async function fetchSingleEndpoint(endpoint: "projects" | "skills" | "user") {
    const response = await fetch(`${DOMAIN_NAME}/api/${endpoint}/all`);
    const mongoData = await response.json();
    switch (endpoint) {
        case "projects":
            const { projects } = mongoData;
            return {
                projects: projects,
            };
        case "skills":
            const { skills } = mongoData;
            return {
                skills: skills,
            };
        case "user":
            const { people } = mongoData;
            return {
                people: people,
            };

        default:
            break;
    }
}

export async function fetchAllEndpoints() {
    const projects = await fetchSingleEndpoint("projects");
    const people = await fetchSingleEndpoint("user");
    const skills = await fetchSingleEndpoint("skills");
    return {
        people: people?.people,
        projects: projects?.projects,
        skills: skills?.skills,
    };
}

export function filterPeopleBySearchParam(searchQuery: string, array?: User[]) {
    const filteredArray = array?.filter((searchHit?: User) => {
        if (searchHit?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())) {
            return searchHit;
        }
    });

    return filteredArray;
}
export function filterProjectsBySearchParam(searchQuery: string, array?: Project[]) {
    const filteredArray = array?.filter((searchHit?: Project) => {
        if (searchHit?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())) {
            return searchHit;
        }
    });

    return filteredArray;
}
export function filterSkillListBySearchParam(searchQuery: string, array?: Skill[]) {
    const filteredArray = array?.filter((searchHit?: Skill) => {
        if (searchHit?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())) {
            return searchHit;
        }
    });

    return filteredArray;
}

export function filterProjectSkillBySearchParam(searchQuery: string, array?: Project[]) {
    const hitsMap = new Map();
    array?.map((searchHit: Project) => {
        searchHit?.skills?.map((skill: Skill) => {
            if (skill?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())) {
                hitsMap.set(`${searchHit._id}`, searchHit);
            }
        });
    });
    const filteredArray = Array.from(hitsMap, ([name, value]) => ({ ...value }));
    return filteredArray;
}
export function filterPersonSkillBySearchParam(searchQuery: string, array?: User[]) {
    const hitsMap = new Map();
    array?.map((searchHit: User) => {
        searchHit?.skills?.map((userSkill: UserSkill & string) => {
            if (userSkill.skill?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())) {
                hitsMap.set(`${searchHit._id}`, searchHit);
            }
        });
    });
    const filteredArray = Array.from(hitsMap, ([name, value]) => ({ ...value }));
    return filteredArray;
}

export function outputFormatterHelper(
    category: "projects" | "skills" | "people" | "all",
    searchQuery: string,
    people?: User[],
    projects?: Project[],
    skills?: skillsGroupType
) {
    switch (category) {
        case "people": {
            const filteredPeople = filterPeopleBySearchParam(searchQuery, people);
            return {
                people: filteredPeople,
            };
        }

        case "projects": {
            const filteredProjects = filterProjectsBySearchParam(searchQuery, projects);
            return {
                projects: filteredProjects,
            };
        }
        case "skills": {
            const filteredSkillsList = filterSkillListBySearchParam(searchQuery, skills?.skillsList);
            const filteredSkillsPeople = filterPersonSkillBySearchParam(searchQuery, skills?.people);
            const filteredSkillsProjects = filterProjectSkillBySearchParam(searchQuery, skills?.projects);

            return {
                skills: {
                    skillsList: filteredSkillsList,
                    people: filteredSkillsPeople,
                    projects: filteredSkillsProjects,
                },
            };
        }
        case "all": {
            const filteredPeople = filterPeopleBySearchParam(searchQuery, people);
            const filteredProjects = filterProjectsBySearchParam(searchQuery, projects);
            const filteredSkillsList = filterSkillListBySearchParam(searchQuery, skills?.skillsList);
            const filteredSkillsPeople = filterPersonSkillBySearchParam(searchQuery, skills?.people);
            const filteredSkillsProjects = filterProjectSkillBySearchParam(searchQuery, skills?.projects);
            return {
                people: filteredPeople,
                projects: filteredProjects,
                skills: {
                    skillsList: filteredSkillsList,
                    people: filteredSkillsPeople,
                    projects: filteredSkillsProjects,
                },
            };
        }
    }
}

export function handleSlideIn(
    data: User | Project | Skill,
    setOpenSlider: (open: boolean) => void,
    setDataInSlider: (data: User | Project | Skill) => void,
    setDataType?: (data: "project" | "skill" | "person" | undefined) => void,
    type?: "project" | "skill" | "person",
    openSlider?: boolean
) {
    if (openSlider) {
        setOpenSlider(false);
        setTimeout(() => {
            setOpenSlider(true);
        }, 500);
    } else {
        setOpenSlider(true);
    }
    setDataInSlider(data);
    if (setDataType) {
        setDataType(type);
    }
}
