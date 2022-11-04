import { DOMAIN_NAME } from "~/util/env-variables";

export async function generateUrl(
    endpoint: "projects" | "skills" | "people" | "all"
) {
    if (endpoint === "people") {
        const url = `${DOMAIN_NAME}/api/user/all`;
        return url;
    } else {
        const url = `${DOMAIN_NAME}/api/${endpoint}/all`;
        return url;
    }
}
