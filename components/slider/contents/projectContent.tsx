import styled from "styled-components";
import ImpactImage from "~/components/image/image";
import { SvgIcon } from "~/components/svg-icon";
import Text from "~/components/typography/text";
import { handleSlideIn } from "~/lib/helpers/search.hepler";
import { Project, Skill, User } from "~/models";
import { useNavStore } from "~/store/store";
import { colors } from "~/util/colorPalette";
import { mq } from "~/util/media-queries";
import { useRouter } from "next/router";

type SliderOverviewProps = {
    projects?: Project[];
};

const ProjectsContent = ({ projects }: SliderOverviewProps) => {
    const { openSlider, sliderData, setDataInSlider, setOpenSlider, setDataType, setBreadcrumbData } =
        useNavStore((state) => ({
            openSlider: state.openSlider,
            toggleSlider: state.toggleSlider,
            sliderData: state.sliderData,
            setDataInSlider: state.setDataInSlider,
            setOpenSlider: state.setOpenSlider,
            setDataType: state.setDataType,
            setBreadcrumbData: state.setBreadcrumbData,
        }));
    const router = useRouter();

    return (
        <ProjectsContainer>
            {projects?.map((project: Project, key) => {
                return (
                    <ProjectTag
                        onClick={() => {
                            handleSlideIn(
                                project,
                                setOpenSlider,
                                setDataInSlider,
                                undefined,
                                "project",
                                openSlider
                            );
                            setBreadcrumbData({ ...sliderData, type: router?.query?.type });
                        }}
                        key={key}
                    >
                        <StyledImage>
                            <ImpactImage
                                src={project?.imageURL}
                                alt="alt text"
                                layout="fill"
                                objectFit="contain"
                                ratio="1/1"
                                placeholderStyles={{
                                    borderRadius: "50%",
                                    width: "100%",
                                    height: "100%",
                                    boxShadow: "0px 22px 30px -10px rgba(0, 0, 0, 0.1)",
                                }}
                                style={{
                                    borderRadius: "50%",
                                    boxShadow: "0px 22px 30px -10px rgba(0, 0, 0, 0.1)",
                                }}
                            />
                        </StyledImage>
                        <Text tag="h5">{project?.name}</Text>
                        <Text
                            tag="h5"
                            additionalStyles={{
                                color: colors.base.grey500,
                                marginLeft: "16px",
                            }}
                        >
                            {project?.tag}
                        </Text>
                        <ArrowContainer>
                            <SvgIcon svg="arrowRight" />
                        </ArrowContainer>
                    </ProjectTag>
                );
            })}
        </ProjectsContainer>
    );
};

export default ProjectsContent;

export const ProjectsContainer = styled.div({
    marginTop: "24px",
    display: "flex",
    flexWrap: "wrap",
    gap: "4px",
    [mq("lg")]: {
        gap: "8px",
    },
});

export const ProjectTag = styled.div({
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    width: "100%",
    ["&:hover"]: {
        ["svg"]: {
            transition: "all .3s ease",
            marginRight: "16px",
        },
    },
});

export const StyledImage = styled.div({
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    aspectRatio: "1/1",
    backgroundColor: colors.base.white,
    marginRight: "16px",
    [mq("lg")]: {
        width: "40px",
        height: "40px",
    },
});

export const ArrowContainer = styled.div({
    marginLeft: "auto",
    ["svg"]: {
        width: "12px !important",
        height: "12px !important",
    },
    [mq("lg")]: {},
});
