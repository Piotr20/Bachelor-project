import useSWR from "swr";
import { generateUrl } from "~/lib/helpers/searchUrl.helper";
import { Project, Skill, User } from "~/models";
import { fetcher } from "~/util/fetcher";

const useSearch = (
    category: "projects" | "skills" | "people" | "all",
    fallbackPeople?: User[],
    fallbackProjects?: Project[],
    fallbackSkills?: Skill[]
) => {
    const { data: mongoPeople, error: peopleError } = useSWR(`/api/user/all`, fetcher, {
        fallbackData: fallbackPeople,
    });
    const { data: mongoProjects, error: projectError } = useSWR(`/api/projects/all`, fetcher, {
        fallbackData: fallbackProjects,
    });
    const { data: mongoSkills, error: skillsError } = useSWR(`/api/skills/all`, fetcher, {
        fallbackData: fallbackSkills,
    });
    switch (category) {
        case "people": {
            return {
                searchHits: {
                    people: mongoPeople?.people,
                },
                isLoading: !peopleError && !mongoPeople,
                isError: peopleError,
            };
        }

        case "projects": {
            return {
                searchHits: {
                    projects: mongoProjects?.projects,
                },
                isLoading: !projectError && !mongoProjects,
                isError: projectError,
            };
        }
        case "skills": {
            return {
                searchHits: {
                    skills: mongoSkills?.skills,
                },
                isLoading: !skillsError && !mongoSkills,
                isError: skillsError,
            };
        }

        case "all":
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

        default:
            break;
    }
};

export default useSearch;
