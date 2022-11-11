import styled from "styled-components";
import { Project, Skill, User } from "~/models";

type SliderOverviewProps = {
    people?: Array<User | string>;
};

const PeopleContent = ({ people }: SliderOverviewProps) => {
    return (
        <PeopleContainer>
            {people?.map((emplouee: User, key: number) => {
                return <div key={key}>{emplouee?.name}</div>;
            })}
        </PeopleContainer>
    );
};

export default PeopleContent;

export const PeopleContainer = styled.div({
    marginTop: "24px",
});
