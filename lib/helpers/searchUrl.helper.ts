export function generateUrl(
    endpoint: "projects" | "skills" | "people" | "all"
) {
    if (endpoint === "people") {
        const url = `/api/user/all`;
        return url;
    } else {
        const url = `/api/${endpoint}/all`;
        return url;
    }
}
