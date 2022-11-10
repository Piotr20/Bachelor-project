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
    fallbackPeople?: User,
    fallbackProjects?: Project,
    fallbackSkills?: Skill
) => {
    if (category === "people") {
        let url = generateUrl(category);
        const { data, error } = useSWR(url, fetcher, {
            fallbackData: fallbackPeople,
        });
        console.log(data);
        return {
            searchHits: {
                people: data,
            },
            isLoading: !error && !data,
            isError: error,
        };
    } else if (category === "all") {
        const { data: mongoPeople, error: peopleError } = useSWR(
            `/api/user/all`,
            fetcher,
            {
                fallbackData: fallbackPeople,
            }
        );
        const { data: mongoProjects, error: projectError } = useSWR(
            `/api/projects/all`,
            fetcher,
            {
                fallbackData: fallbackProjects,
            }
        );
        const { data: mongoSkills, error: skillsError } = useSWR(
            `/api/skills/all`,
            fetcher,
            {
                fallbackData: fallbackSkills,
            }
        );
        return {
            searchHits: {
                people: mongoPeople?.people,
                projects: mongoProjects?.projects,
                skills: mongoSkills?.skills,
            },
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
