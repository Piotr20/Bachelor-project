import { Project, Skill, User } from "~/models";
import Projects from "~/pages/projects";
import { DOMAIN_NAME } from "~/util/env-variables";

export async function fetchSearchResults(
    category: "projects" | "skills" | "people" | "all"
) {
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

export async function fetchSingleEndpoint(
    endpoint: "projects" | "skills" | "user"
) {
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

export function filterBySearchParam(
    searchQuery: string,
    array?: User[] & Project[] & Skill[]
) {
    const filteredArray = array?.filter((searchHit: Project | Skill | User) => {
        if (
            searchHit?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        ) {
            return searchHit;
        }
    });

    return filteredArray;
}

export function outputFormatterHelper(
    category: "projects" | "skills" | "people" | "all",
    searchQuery: string,
    people?: User[],
    projects?: Project[],
    skills?: Skill[]
) {
    switch (category) {
        case "people": {
            const filteredPeople = filterBySearchParam(searchQuery, people);
            return {
                people: filteredPeople,
            };
        }

        case "projects": {
            const filteredProjects = filterBySearchParam(searchQuery, projects);
            return {
                projects: filteredProjects,
            };
        }
        case "skills": {
            const filteredSkills = filterBySearchParam(searchQuery, skills);
            return {
                skills: filteredSkills,
            };
        }
        case "all": {
            const filteredPeople = filterBySearchParam(searchQuery, people);
            const filteredProjects = filterBySearchParam(searchQuery, projects);
            const filteredSkills = filterBySearchParam(searchQuery, skills);
            return {
                people: filteredPeople,
                projects: filteredProjects,
                skills: filteredSkills,
            };
        }
    }
}
