export function generateUrl(endpoint: "projects" | "skills" | "people" | "all") {
    if (endpoint === "people") {
        const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/user/all`;
        return url;
    } else {
        const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/${endpoint}/all`;
        return url;
    }
}
