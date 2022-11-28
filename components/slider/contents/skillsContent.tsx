import styled from "styled-components";
import ImpactImage from "~/components/image/image";
import Text from "~/components/typography/text";
import { handleSlideIn } from "~/lib/helpers/search.hepler";
import { Skill, UserSkill } from "~/models";
import { useNavStore } from "~/store/store";
import { colors } from "~/util/colorPalette";
import { mq } from "~/util/media-queries";

type SliderOverviewProps = {
    skills?: Skill[];
};

const SkillsContent = ({ skills }: SliderOverviewProps) => {
    const { openSlider, setDataInSlider, setOpenSlider, setDataType } =
        useNavStore((state) => ({
            openSlider: state.openSlider,
            toggleSlider: state.toggleSlider,
            setDataInSlider: state.setDataInSlider,
            setOpenSlider: state.setOpenSlider,
            setDataType: state.setDataType,
        }));

    return (
        <SkillsContainer>
            {skills?.map((skill: Skill, key) => {
                return (
                    <SkillTag key={key}>
                        <ImpactImage
                            src={skill?.imageURL}
                            alt={skill?.name}
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
                        <Text tag="h6"> {skill?.name}</Text>
                    </SkillTag>
                );
            })}
        </SkillsContainer>
    );
};

export default SkillsContent;

export const SkillsContainer = styled.div({
    marginTop: "24px",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
});

export const SkillTag = styled.div({
    display: "flex",
    alignItems: "center",
    padding: "8px 24px",
    backgroundColor: colors.secondary.lightYellow + "60",
    borderRadius: "48px",
});
