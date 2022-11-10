import { DOMAIN_NAME } from "~/util/env-variables";

export function generateUrl(
    endpoint: "projects" | "skills" | "people" | "all"
) {
    console.log(DOMAIN_NAME);
    if (endpoint === "people") {
        const url = `/api/user/all`;
        return url;
    } else {
        const url = `/api/${endpoint}/all`;
        return url;
    }
}
