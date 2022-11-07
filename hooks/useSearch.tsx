import useSWR from "swr";
import { generateUrl } from "~/lib/helpers/searchUrl.helper";
import { Project, Skill, User } from "~/models";
import { DOMAIN_NAME } from "~/util/env-variables";

import { fetcher } from "~/util/fetcher";

type SearchProps = {
    category: "projects" | "skills" | "people" | "all";
    fallbackData: User | Project | Skill;
};

const useSearch = (
    category: "projects" | "skills" | "people" | "all",
    fallbackData: User | Project | Skill
) => {
    if (category === "projects" || category === "skills" || category === "people") {
        let url = generateUrl(category);
        const { data, error } = useSWR(url, fetcher, {
            fallbackData: fallbackData,
        });
        return {
            searchHits: data,
            isLoading: !error && !data,
            isError: error,
        };
    } else if (category === "all") {
        const { data: mongoPeople, error: peopleError } = useSWR(`/api/user/all`, fetcher, {
            fallbackData: fallbackData,
        });
        const { data: mongoProjects, error: projectError } = useSWR(`/api/projects/all`, fetcher, {
            fallbackData: fallbackData,
        });
        const { data: mongoSkills, error: skillsError } = useSWR(`/api/skills/all`, fetcher, {
            fallbackData: fallbackData,
        });
        const allEndpointsData = [
            ...(mongoProjects.projects || []),
            ...(mongoPeople.people || []),
            ...(mongoSkills.skills || []),
        ];
        return {
            searchHits: allEndpointsData,
            isLoading:
                !peopleError &&
                !mongoPeople &&
                !projectError &&
                !mongoProjects &&
                !skillsError &&
                !mongoSkills,
            isError: { projectError, peopleError, skillsError },
        };
    }
};

export default useSearch;
