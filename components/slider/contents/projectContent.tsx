import styled from "styled-components";
import { Project, Skill, User } from "~/models";

type SliderOverviewProps = {
    projects?: Project[];
};

const ProjectsContent = ({ projects }: SliderOverviewProps) => {
    return (
        <ProjectsContainer>
            {projects?.map((project: Project, key) => {
                return <div key={key}>{project?.name}</div>;
            })}
        </ProjectsContainer>
    );
};

export default ProjectsContent;

export const ProjectsContainer = styled.div({
    marginTop: "24px",
});
