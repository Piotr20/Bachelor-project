import { Project, Skill, User } from "~/models";
import { Option } from "~/models/option";

export async function getAllFromEndpointHelper(
    setBasedOnEndpoint: any,
    endpoint: "projects" | "skills"
) {
    const response = await fetch(`./api/${endpoint}/all`);
    if (endpoint === "projects") {
        const projectList = await response.json();
        let projectArray: Option[] = [];
        projectList.projects?.forEach((project: Project) => {
            projectArray.push({ value: project?._id, label: project?.name });
        });
        setBasedOnEndpoint(projectArray);
    }
    if (endpoint === "skills") {
        const skillList = await response.json();
        let skillArray: Option[] = [];
        skillList.skills?.forEach((skill: Skill) => {
            skillArray.push({ value: skill?._id, label: skill?.name });
        });
        setBasedOnEndpoint(skillArray);
    }
}

export function handleUserPropsHelper(
    selectedOptions: Option[],
    setUser: (data: User) => void,
    user: User,
    setSelectedOptions: (data: Option[]) => void,
    propertyToSet: "projects" | "skills"
) {
    let selectedIDs: string[] = [];
    selectedOptions.forEach((option: Option) => {
        if (option?.value) {
            selectedIDs?.push(option?.value);
            if (propertyToSet === "projects") {
                setUser({
                    ...user,
                    projects: selectedIDs,
                });
            }
            if (propertyToSet === "skills") {
                setUser({
                    ...user,
                    skills: selectedIDs,
                });
            }
        }
    });
    setSelectedOptions(selectedOptions);
}
