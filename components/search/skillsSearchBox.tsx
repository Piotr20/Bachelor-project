import { useEffect } from "react";
import styled from "styled-components";
import { Project, Skill, User } from "~/models";
import { useNavStore } from "~/store/store";
import { Button } from "../button/button";
import ImpactImage from "../image/image";
import Text from "../typography/text";
import { useRouter } from "next/router";

type SkillSearchBoxProps = {
    data: Skill;
};

const SkillSearchBox = ({ data }: SkillSearchBoxProps) => {
    const { toggleSlider, openSlider, setDataInSlider, setOpenSlider } =
        useNavStore((state) => ({
            openSlider: state.openSlider,
            toggleSlider: state.toggleSlider,
            setDataInSlider: state.setDataInSlider,
            setOpenSlider: state.setOpenSlider,
        }));
    const router = useRouter();

    function handleSlideIn() {
        if (openSlider) {
            setOpenSlider(false);
            setTimeout(() => {
                setOpenSlider(true);
            }, 500);
        } else {
            setOpenSlider(true);
        }
        setDataInSlider(data);
    }

    return (
        <StyledSearchBox>
            <ImpactImage
                src={data?.imageURL}
                alt="alt text"
                layout="fill"
                objectFit="contain"
                ratio="2/1"
                containerWidth="100%"
            />
            <Text
                tag="h4"
                additionalStyles={{
                    textAlign: "center",
                    marginBottom: "12px",
                }}
            >
                {data?.name}
            </Text>
            <Button onClick={handleSlideIn} kind="primary">
                <Text tag="p">Open</Text>
            </Button>
        </StyledSearchBox>
    );
};

export default SkillSearchBox;

export const StyledSearchBox = styled.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "white",
    boxShadow: "0px 22px 30px -10px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
});
