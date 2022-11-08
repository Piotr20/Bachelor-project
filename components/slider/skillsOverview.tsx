import styled from "styled-components";
import { Project, Skill, User } from "~/models";

type SliderOverviewProps = {
    data: User & Project & Skill;
};

const SliderSkillsOverview = ({ data }: SliderOverviewProps) => {
    return (
        <SkillsContainer>
            {data?.skills?.map((skill: any, key) => {
                return <div key={key}>{skill.name}</div>;
            })}
        </SkillsContainer>
    );
};

export default SliderSkillsOverview;

export const SkillsContainer = styled.div({
    marginTop: "24px",
});
