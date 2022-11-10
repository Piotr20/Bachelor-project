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
    switch (category) {
        case "people": {
            let url = generateUrl(category);
            const { data, error } = useSWR(url, fetcher, {
                fallbackData: fallbackPeople,
            });
            return {
                searchHits: {
                    people: data?.people,
                },
                isLoading: !error && !data,
                isError: error,
            };
        }
        case "projects": {
            let url = generateUrl(category);
            const { data, error } = useSWR(url, fetcher, {
                fallbackData: fallbackProjects,
            });
            return {
                searchHits: {
                    projects: data?.projects,
                },
                isLoading: !error && !data,
                isError: error,
            };
        }
        case "skills": {
            let url = generateUrl(category);
            const { data, error } = useSWR(url, fetcher, {
                fallbackData: fallbackSkills,
            });
            return {
                searchHits: {
                    skills: data?.skills,
                },
                isLoading: !error && !data,
                isError: error,
            };
        }

        case "all":
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

        default:
            break;
    }
};

export default useSearch;
