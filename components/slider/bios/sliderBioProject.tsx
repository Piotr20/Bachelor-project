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
            <ImpactImage
                src={data?.imageURL}
                alt="alt text"
                layout="fill"
                ratio="1/1"
                objectFit="contain"
                containerStyles={{
                    width: "50%",

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
    marginTop: "16px",
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