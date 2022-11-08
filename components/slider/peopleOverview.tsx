import styled from "styled-components";
import { Project, Skill, User } from "~/models";

type SliderOverviewProps = {
    data: User & Project & Skill;
};

const SliderPeopleOverview = ({ data }: SliderOverviewProps) => {
    return (
        <PeopleContainer>
            {data?.people?.map((emplouee: any, key) => {
                return <div key={key}>{emplouee.name}</div>;
            })}
        </PeopleContainer>
    );
};

export default SliderPeopleOverview;

export const PeopleContainer = styled.div({
    marginTop: "24px",
});
