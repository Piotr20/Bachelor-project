import styled from "styled-components";
import { Skill } from "~/models";

type SliderOverviewProps = {
    skills?: Skill[];
};

const SkillsContent = ({ skills }: SliderOverviewProps) => {
    return (
        <SkillsContainer>
            {skills?.map((skill: Skill, key) => {
                return <div key={key}>{skill?.name}</div>;
            })}
        </SkillsContainer>
    );
};

export default SkillsContent;

export const SkillsContainer = styled.div({
    marginTop: "24px",
});
