import { Project, Skill, User } from "~/models";
import { DOMAIN_NAME } from "~/util/env-variables";

export async function fetchSearchResults(
    category: "projects" | "skills" | "people" | "all"
) {
    switch (category) {
        case "people":
            const people = fetchSingleEndpoint("user");
            return people;
        case "projects":
            const projects = await fetchSingleEndpoint("projects");
            return projects;
        case "skills":
            const skills = fetchSingleEndpoint("skills");
            return skills;

        case "all":
            const all = fetchAllEndpoints();
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
            return projects;
        case "skills":
            const { skills } = mongoData;
            return skills;
        case "user":
            const { people } = mongoData;
            return people;

        default:
            break;
    }
}

export async function fetchAllEndpoints() {
    const projects = await fetchSingleEndpoint("projects");
    const people = await fetchSingleEndpoint("user");
    const skills = await fetchSingleEndpoint("skills");
    const allEndpointsData = projects.concat(people, skills);
    return allEndpointsData;
}

export function filterBySearchParam(
    array: User[] & Project[] & Skill[],
    searchQuery: string
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
