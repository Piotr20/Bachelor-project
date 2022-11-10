import { useEffect } from "react";
import styled from "styled-components";
import { Project, Skill, User } from "~/models";
import { useNavStore } from "~/store/store";
import { Button } from "../button/button";
import ImpactImage from "../image/image";
import Text from "../typography/text";
import { useRouter } from "next/router";
import { colors } from "~/util/colorPalette";
import { mq } from "~/util/media-queries";

type PeopleSearchBoxProps = {
    data: User;
};

const PeopleSearchBox = ({ data }: PeopleSearchBoxProps) => {
    const { toggleSlider, openSlider, setDataInSlider, setOpenSlider } = useNavStore((state) => ({
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
            <StyledImage>
                <ImpactImage
                    src={data?.imageURL}
                    alt="alt text"
                    layout="fill"
                    objectFit="contain"
                    ratio="1/1"
                    containerWidth="100%"
                    style={{
                        borderRadius: "50%",
                    }}
                />
            </StyledImage>
            <Text
                tag="h4"
                additionalStyles={{
                    textAlign: "center",
                    marginTop: "calc(10% + 28px)",
                    marginBottom: "4px",
                    minHeight: "5ch",
                    maxHeight: "5ch",
                    overflow: "hidden",
                    [mq("lg")]: {
                        marginBottom: "4px",
                        marginTop: "calc(12.5% + 16px)",
                        minHeight: "2.5ch",
                        maxHeight: "2.5ch",
                    },
                }}
            >
                {data?.name}
            </Text>
            <Text
                tag="p"
                additionalStyles={{
                    color: colors.primary.lightGrey,
                    fontWeight: 400,
                }}
            >
                {data?.role + " | " + data?.department}
            </Text>
            <Button onClick={handleSlideIn} kind="primary">
                Open
            </Button>
        </StyledSearchBox>
    );
};

export default PeopleSearchBox;

export const StyledSearchBox = styled.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "white",
    boxShadow: "0px 22px 30px -10px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    position: "relative",
});

export const StyledImage = styled.div({
    width: "108px",
    borderRadius: "50%",
    position: "absolute",
    aspectRatio: "1/1",
    top: "0",
    transform: "translate(0,-50%)",
});
