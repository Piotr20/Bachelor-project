import { useEffect } from "react";
import styled from "styled-components";
import { Project, Skill, User } from "~/models";
import { useNavStore } from "~/store/store";
import { Button } from "../button/button";
import ImpactImage from "../image/image";
import Text from "../typography/text";
import { useRouter } from "next/router";
import { mq } from "~/util/media-queries";
import { colors } from "~/util/colorPalette";
import { SvgIcon } from "../svg-icon";
import { handleSlideIn } from "~/lib/helpers/search.hepler";
import { recentSearchesManager } from "~/lib/services/recentSearchesManager.service";

type ProjectsSearchBoxProps = {
    data: Project;
};

const ProjectsSearchBox = ({ data }: ProjectsSearchBoxProps) => {
    const { openSlider, setDataInSlider, setOpenSlider, setDataType } = useNavStore((state) => ({
        openSlider: state.openSlider,
        toggleSlider: state.toggleSlider,
        setDataInSlider: state.setDataInSlider,
        setOpenSlider: state.setOpenSlider,
        setDataType: state.setDataType,
    }));
    const router = useRouter();

    return (
        <StyledSearchBox
            onClick={() => {
                handleSlideIn(
                    data,
                    setOpenSlider,
                    setDataInSlider,
                    setDataType as any,
                    "project",
                    openSlider
                );
                recentSearchesManager(data, "project");
            }}
        >
            <StyledImageContainer>
                <StyledBackgroundImage>
                    <ImpactImage
                        src={data?.backgroundImageURL}
                        alt={data?.name}
                        layout="fill"
                        objectFit="cover"
                        containerWidth="100%"
                        containerHeight="100%"
                        placeholderStyles={{ width: "100%" }}
                        style={{}}
                    />
                </StyledBackgroundImage>
                <StyledImage>
                    <ImpactImage
                        src={data?.imageURL}
                        alt={data?.name}
                        layout="fill"
                        objectFit="contain"
                        ratio="1/1"
                        containerWidth="100%"
                        placeholderStyles={{
                            borderRadius: "50%",
                        }}
                        style={{
                            borderRadius: "50%",
                        }}
                    />
                </StyledImage>
            </StyledImageContainer>

            <Text
                tag="h4"
                additionalStyles={{
                    textAlign: "center",
                    marginBottom: "4px",
                    [mq("lg")]: {
                        marginBottom: "4px",
                    },
                }}
            >
                {data?.name}
            </Text>
            <Text
                tag="h5"
                additionalStyles={{
                    color: colors.primary.lightGrey,
                    fontWeight: 400,
                    marginTop: "4px",

                    textAlign: "center",
                    fontSize: "16px",
                    [mq("lg")]: {
                        fontSize: "20px !important",
                    },
                    [mq("xl")]: {
                        fontSize: "22px !important",
                    },
                }}
            >
                {data?.tag}
            </Text>
            <CTASection>
                <Button
                    onClick={() =>
                        handleSlideIn(
                            data,
                            setOpenSlider,
                            setDataInSlider,
                            setDataType as any,
                            "project",
                            openSlider
                        )
                    }
                    kind="link"
                >
                    Show details <SvgIcon svg="arrowRight" />
                </Button>
            </CTASection>
        </StyledSearchBox>
    );
};

export default ProjectsSearchBox;

export const StyledSearchBox = styled.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "8px",
    backgroundColor: "white",
    boxShadow: "0px 22px 30px -10px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    position: "relative",
    cursor: "pointer",
});

export const StyledImageContainer = styled.div({
    position: "relative",
    width: "100%",
    marginBottom: "16px",
    [mq("lg")]: {
        marginBottom: "20px",
    },
});

export const StyledBackgroundImage = styled.div({
    height: "84px",
    [mq("lg")]: {
        height: "144px",
    },
});

export const StyledImage = styled.div({
    width: "50px",
    borderRadius: "50%",
    aspectRatio: "1/1",
    backgroundColor: colors.base.white,
    padding: "4px",
    position: "absolute",
    bottom: "8px",
    right: "4px",
    transform: "translateY(50%)",
    boxShadow: "0px 22px 30px -10px rgba(0, 0, 0, 0.1)",
    [mq("lg")]: {
        width: "65px",
        bottom: "12px",
        right: "8px",
    },
});

export const CTASection = styled.div({
    width: "108%",
    marginTop: "12px",
    paddingTop: "8px",
    borderTop: `1px solid ${colors.base.grey500}`,
    display: "flex",
    justifyContent: "center",
    [mq("lg")]: {
        width: "80%",
        marginTop: "20px",
    },
});
