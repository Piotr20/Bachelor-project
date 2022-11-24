import styled from "styled-components";
import ImpactImage from "~/components/image/image";
import { SvgIcon } from "~/components/svg-icon";
import Text from "~/components/typography/text";
import { Project, Skill, User } from "~/models";
import { colors } from "~/util/colorPalette";
import { mq } from "~/util/media-queries";

type SliderBioProps = {
    data: Project;
};

const SliderBioProject = ({ data }: SliderBioProps) => {
    return (
        <BioContainer>
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
                tag="h3"
                additionalStyles={{
                    marginTop: "16px",
                    [mq("lg")]: {
                        marginTop: "24px",
                    },
                    [mq("xl")]: {
                        marginTop: "32px",
                    },
                }}
            >
                {data?.name}
            </Text>
            <Text
                tag="h5"
                additionalStyles={{
                    marginTop: "8px",
                    color: colors.primary.lightGrey,
                }}
            >
                {data?.tag}
            </Text>

            <IconContainer>
                <SvgIcon svg="calendarEmpty" />
                <Text
                    tag="p"
                    additionalStyles={{
                        marginLeft: "6px",
                    }}
                >
                    {data?.startDate?.toString().split("T")[0]} -{data?.endDate?.toString().split("T")[0]}
                </Text>
            </IconContainer>
        </BioContainer>
    );
};

export default SliderBioProject;

export const BioContainer = styled.div({
 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

export const IconContainer = styled.div({
    display: "flex",
    marginTop: "8px",
    opacity: 0.8,
    ["svg"]: {
        width: "24px !important",
        height: "24px !important",
    },
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
    height: "256px",
    [mq("lg")]: {
        height: "320px",
    },
});

export const StyledImage = styled.div({
    width: "84px",
    borderRadius: "50%",
    aspectRatio: "1/1",
    backgroundColor: colors.base.white,
    padding: "4px",
    position: "absolute",
    bottom: "8px",
    right: "8px",
    transform: "translateY(50%)",
    boxShadow: "0px 22px 30px -10px rgba(0, 0, 0, 0.1)",
    [mq("lg")]: {
        width: "96px",
        bottom: "12px",
        right: "12px",
    },
});
