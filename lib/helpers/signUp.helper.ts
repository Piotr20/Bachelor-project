import { Project, Skill, User, UserSkill } from "~/models";
import { Option } from "~/models/option";

export async function getAllFromEndpointHelper(setBasedOnEndpoint: any, endpoint: "projects" | "skills") {
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
        skillList.skills?.skillsList?.forEach((skill: Skill) => {
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
                    projects: selectedIDs as Project[],
                });
            }
        }
    });
    setSelectedOptions(selectedOptions);
}

export function UserPropsSkillsHelper(
    expertise: "basic" | "intermidiate" | "expert",
    selectedOptions: Option[],
    mongoSkills: UserSkill[],
    setMongoSkils: (data: UserSkill[]) => void
) {
    let selectedMongoSkills: UserSkill[] = [];
    selectedOptions.forEach((option: Option) => {
        selectedMongoSkills?.push({
            skill: option?.value,
            expertise: expertise,
        });
    });
    setMongoSkils(selectedMongoSkills);
}
