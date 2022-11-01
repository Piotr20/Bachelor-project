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
    const response = await fetch(`http://localhost:3000/api/${endpoint}/all`);
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
