import { useState } from "react";
import styled from "styled-components";
import { Project, Skill, User } from "~/models";
import { colors } from "~/util/colorPalette";
import { mq } from "~/util/media-queries";
import ImpactImage from "../../image/image";
import { SvgIcon } from "../../svg-icon";
import Text from "../../typography/text";

type SliderBioProps = {
    data: User;
};

const SliderBioPerson = ({ data }: SliderBioProps) => {
    const [clipboard, setClipboard] = useState<"phone" | "email" | null>(null);
    return (
        <BioContainer>
            <ImpactImage
                src={data?.imageURL}
                alt="alt text"
                layout="fill"
                ratio="1/1"
                objectFit="contain"
                containerStyles={{
                    width: "50%",
                    filter: "drop-shadow(2px 4px 12px rgba(0, 0, 0, 0.08))",
                    [mq("lg")]: {
                        width: "184px",
                    },
                    [mq("xl")]: {
                        width: "200px",
                    },
                }}
                placeholderStyles={{
                    width: "50%",
                    aspectRatio: "1/1",
                    borderRadius: "50%",

                    [mq("lg")]: {
                        width: "184px",
                    },
                    [mq("xl")]: {
                        width: "200px",
                    },
                }}
                style={{ borderRadius: "50%" }}
            />
            <Text
                tag="h3"
                additionalStyles={{
                    marginTop: "16px",
                    [mq("lg")]: {
                        marginTop: "32px",
                    },
                    [mq("xl")]: {
                        marginTop: "40px",
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
                {data?.role}
            </Text>

            <IconContainer>
                <SvgIcon svg="location" />
                <Text
                    tag="h6"
                    additionalStyles={{
                        marginLeft: "6px",
                    }}
                >
                    {data?.department + ", " + data?.location}
                </Text>
            </IconContainer>
            <ProjectDetails>
                <Text
                    tag="h5"
                    additionalStyles={{
                        marginBottom: "12px",
                    }}
                >
                    Contact
                </Text>
                <StyledAnchor
                    active={clipboard === "phone"}
                    onClick={() => {
                        navigator.clipboard.writeText(data?.phone as string);
                        setClipboard("phone");
                        setTimeout(() => {
                            setClipboard(null);
                        }, 500);
                    }}
                >
                    <SvgIcon svg="phone" />
                    {data?.phone}
                    <SvgIcon svg="clipboard" />
                </StyledAnchor>
                <StyledAnchor
                    active={clipboard === "email"}
                    onClick={() => {
                        navigator.clipboard.writeText(data?.email as string);
                        setClipboard("email");
                        setTimeout(() => {
                            setClipboard(null);
                        }, 500);
                    }}
                >
                    <SvgIcon svg="email" />
                    {data?.email}
                    <SvgIcon svg="clipboard" />
                </StyledAnchor>
            </ProjectDetails>
        </BioContainer>
    );
};

export default SliderBioPerson;

export const BioContainer = styled.div({
    marginTop: "84px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

export const IconContainer = styled.div({
    display: "flex",
    alignItems: "center",
    marginTop: "8px",
    opacity: 0.8,
    ["svg"]: {
        width: "24px !important",
        height: "24px !important",
    },
});

export const ProjectDetails = styled.div({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: "8px",
    padding: "0 24px",
    [mq("lg")]: {
        padding: "0 40px",
    },
});

export const StyledAnchor = styled.span<{
    active: boolean;
}>(({ active }) => ({
    fontFamily: "Flama Condensed",
    display: "inline-block",
    width: "fit-content",
    alignItems: "center",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: "16px",
    color: colors.primary.black,
    padding: "1px 0",
    backgroundImage: "linear-gradient(#feff00,#feff00)",
    backgroundSize: "0 40%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 95%",
    [mq("lg")]: {
        fontSize: "16px",
    },
    transition: "all 0.3s ease",
    ["&>span:nth-of-type(2)"]: {
        opacity: active ? 1 : 0,
        transition: "all 0.3s ease",
        marginLeft: "8px",
        width: "16px !important",
        height: "16px !important",
        [mq("lg")]: {
            width: "20px !important",
            height: "20px !important",
        },
        ["path"]: {
            stroke: colors.primary.black,
        },
    },
    ["&:hover"]: {
        backgroundImage: "linear-gradient(#feff00,#feff00)",
        backgroundSize: "calc(100% - 24px) 40%",
        backgroundPosition: "0 95%",
    },
    ["&>span:nth-of-type(1)"]: {
        marginRight: "8px",
        ["path"]: {
            fill: colors.primary.black,
        },
        width: "16px !important",
        height: "16px !important",
        [mq("lg")]: {
            width: "20px !important",
            height: "20px !important",
        },
    },
}));
