import styled from "styled-components";
import ImpactImage from "~/components/image/image";
import Text from "~/components/typography/text";
import { handleSlideIn } from "~/lib/helpers/search.hepler";
import { Skill, UserSkill } from "~/models";
import { useNavStore } from "~/store/store";
import { colors } from "~/util/colorPalette";
import { mq } from "~/util/media-queries";

type SliderOverviewProps = {
    skills?: UserSkill[];
};

const SkillsContentExpertise = ({ skills }: SliderOverviewProps) => {
    const { openSlider, setDataInSlider, setOpenSlider, setDataType } = useNavStore((state) => ({
        openSlider: state.openSlider,
        toggleSlider: state.toggleSlider,
        setDataInSlider: state.setDataInSlider,
        setOpenSlider: state.setOpenSlider,
        setDataType: state.setDataType,
    }));

    const basicSkills = skills?.filter((skill: UserSkill) => {
        if (skill?.expertise === "basic") {
            return skill;
        }
    });
    const intermidiateSkills = skills?.filter((skill: UserSkill) => {
        if (skill?.expertise === "intermidiate") {
            return skill;
        }
    });
    const expertSkills = skills?.filter((skill: UserSkill) => {
        if (skill?.expertise === "expert") {
            return skill;
        }
    });

    return (
        <>
            <Text
                tag="h5"
                additionalStyles={{
                    color: colors.base.grey500,
                    marginTop: "24px",
                    marginBottom: "8px",
                }}
            >
                Expert
            </Text>
            <SkillsContainer>
                {expertSkills?.map((userSkill: UserSkill, key) => {
                    return (
                        <SkillTag key={key} expertise="expert">
                            <ImpactImage
                                src={(userSkill?.skill as Skill)?.imageURL}
                                alt={(userSkill?.skill as Skill)?.name}
                                layout="fill"
                                ratio="1/1"
                                objectFit="contain"
                                containerStyles={{
                                    width: "24px",

                                    [mq("lg")]: {
                                        width: "28px",
                                    },
                                    [mq("xl")]: {
                                        width: "32px",
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
                            <Text tag="h6"> {(userSkill?.skill as Skill)?.name}</Text>
                        </SkillTag>
                    );
                })}
            </SkillsContainer>
            <Text
                tag="h5"
                additionalStyles={{
                    color: colors.base.grey500,
                    marginBottom: "8px",
                }}
            >
                Intermidiate
            </Text>
            <SkillsContainer>
                {intermidiateSkills?.map((userSkill: UserSkill, key) => {
                    return (
                        <SkillTag key={key} expertise="intermidiate">
                            <ImpactImage
                                src={(userSkill?.skill as Skill)?.imageURL}
                                alt={(userSkill?.skill as Skill)?.name}
                                layout="fill"
                                ratio="1/1"
                                objectFit="contain"
                                containerStyles={{
                                    width: "24px",

                                    [mq("lg")]: {
                                        width: "28px",
                                    },
                                    [mq("xl")]: {
                                        width: "32px",
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
                            <Text tag="h6"> {(userSkill?.skill as Skill)?.name}</Text>
                        </SkillTag>
                    );
                })}
            </SkillsContainer>
            <Text
                tag="h5"
                additionalStyles={{
                    color: colors.base.grey500,
                    marginBottom: "8px",
                }}
            >
                Basic
            </Text>
            <SkillsContainer>
                {basicSkills?.map((userSkill: UserSkill, key) => {
                    return (
                        <SkillTag key={key} expertise="basic">
                            <ImpactImage
                                src={(userSkill?.skill as Skill)?.imageURL}
                                alt={(userSkill?.skill as Skill)?.name}
                                layout="fill"
                                ratio="1/1"
                                objectFit="contain"
                                containerStyles={{
                                    width: "24px",

                                    [mq("lg")]: {
                                        width: "28px",
                                    },
                                    [mq("xl")]: {
                                        width: "32px",
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
                            <Text tag="h6"> {(userSkill?.skill as Skill)?.name}</Text>
                        </SkillTag>
                    );
                })}
            </SkillsContainer>
        </>
    );
};

export default SkillsContentExpertise;

export const SkillsContainer = styled.div({
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "12px",
});

export const SkillTag = styled.div<{ expertise: "basic" | "intermidiate" | "expert" }>(({ expertise }) => ({
    display: "flex",
    alignItems: "center",
    padding: "8px 24px",
    backgroundColor:
        expertise === "expert"
            ? colors.secondary.red + "60"
            : expertise === "intermidiate"
            ? colors.secondary.lightYellow + "60"
            : colors.secondary.green + "60",
    borderRadius: "48px",
}));
