import { handleSlideIn } from "~/lib/helpers/search.hepler";
import { Project } from "~/models";
import { useNavStore } from "~/store/store";
import { colors } from "~/util/colorPalette";
import ImpactImage from "../image/image";
import { ArrowContainer, PeopleTag, StyledImage, TextWrapper } from "../slider/contents/peopleContent";
import { ProjectTag } from "../slider/contents/projectContent";
import { SvgIcon } from "../svg-icon";
import Text from "../typography/text";

type PersonTagProps = {
    project: Project;
};

const ProjectsTag = ({ project }: PersonTagProps) => {
    const { openSlider, setDataInSlider, setOpenSlider, setDataType } = useNavStore((state) => ({
        openSlider: state.openSlider,
        toggleSlider: state.toggleSlider,
        sliderData: state.sliderData,
        breadcrumbData: state.breadcrumbData,
        setDataInSlider: state.setDataInSlider,
        setDataType: state.setDataType,
        setOpenSlider: state.setOpenSlider,
    }));
    return (
        <ProjectTag
            onClick={() => {
                handleSlideIn(project, setOpenSlider, setDataInSlider, undefined, "project", openSlider);
            }}
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
};

export default ProjectsTag;
