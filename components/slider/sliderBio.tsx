import styled from "styled-components";
import { Project, Skill, User } from "~/models";
import { colors } from "~/util/colorPalette";
import { mq } from "~/util/media-queries";
import ImpactImage from "../image/image";
import { SvgIcon } from "../svg-icon";
import Text from "../typography/text";

type SliderBioProps = {
    data: User & Project & Skill;
};

const SliderBio = ({ data }: SliderBioProps) => {
    return (
        <BioContainer>
            <ImpactImage
                src={data?.imageURL}
                alt="alt text"
                layout="fill"
                ratio="1/1"
                containerStyles={{
                    width: "50%",
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
                {data?.role || data?.tag}
            </Text>
            {data?.location ? (
                <IconContainer>
                    <SvgIcon svg="location" />
                    <Text
                        tag="p"
                        additionalStyles={{
                            marginLeft: "6px",
                        }}
                    >
                        {data?.location}
                    </Text>
                </IconContainer>
            ) : data?.tag ? (
                <IconContainer>
                    <SvgIcon svg="calendarEmpty" />
                    <Text
                        tag="p"
                        additionalStyles={{
                            marginLeft: "6px",
                        }}
                    >
                        {data?.startDate + "-" + data?.endDate}
                    </Text>
                </IconContainer>
            ) : null}
        </BioContainer>
    );
};

export default SliderBio;

export const BioContainer = styled.div({
    marginTop: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

export const IconContainer = styled.div({
    display: "flex",
    marginTop: "8px",
    opacity: 0.5,
    ["svg"]: {
        width: "24px !important",
        height: "24px !important",
    },
});
