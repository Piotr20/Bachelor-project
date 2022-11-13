import styled from "styled-components";
import Text from "~/components/typography/text";
import { handleSlideIn } from "~/lib/helpers/search.hepler";
import { Skill } from "~/models";
import { useNavStore } from "~/store/store";
import { colors } from "~/util/colorPalette";

type SliderOverviewProps = {
    skills?: Skill[];
};

const SkillsContent = ({ skills }: SliderOverviewProps) => {
    const { openSlider, setDataInSlider, setOpenSlider, setDataType } = useNavStore((state) => ({
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
                    <SkillTag
                        onClick={() =>
                            handleSlideIn(
                                skill,
                                setOpenSlider,
                                setDataInSlider,
                                setDataType,
                                "skill",
                                openSlider
                            )
                        }
                        key={key}
                    >
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
    padding: "8px 24px",
    backgroundColor: colors.secondary.lightYellow + "40",
    borderRadius: "48px",
    cursor: "pointer",
});
