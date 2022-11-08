import styled from "styled-components";
import { Project, Skill, User } from "~/models";

type SliderOverviewProps = {
    data: User & Project & Skill;
};

const SliderProjectsOverview = ({ data }: SliderOverviewProps) => {
    return (
        <ProjectsContainer>
            {data?.projects?.map((project: any, key) => {
                return <div key={key}>{project.name}</div>;
            })}
        </ProjectsContainer>
    );
};

export default SliderProjectsOverview;

export const ProjectsContainer = styled.div({
    marginTop: "24px",
});
