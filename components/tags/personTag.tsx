import { handleSlideIn } from "~/lib/helpers/search.hepler";
import { User } from "~/models";
import { useNavStore } from "~/store/store";
import { colors } from "~/util/colorPalette";
import ImpactImage from "../image/image";
import { ArrowContainer, PeopleTag, StyledImage, TextWrapper } from "../slider/contents/peopleContent";
import { SvgIcon } from "../svg-icon";
import Text from "../typography/text";

type PersonTagProps = {
    person: User;
};

const PersonTag = ({ person }: PersonTagProps) => {
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
        <PeopleTag
            onClick={() => {
                handleSlideIn(person, setOpenSlider, setDataInSlider, setDataType, "person", openSlider);
            }}
        >
            <StyledImage>
                <ImpactImage
                    src={person?.imageURL}
                    alt="alt text"
                    layout="fill"
                    objectFit="contain"
                    ratio="1/1"
                    placeholderStyles={{
                        borderRadius: "50%",
                        width: "100%",
                        height: "100%",
                    }}
                    style={{
                        borderRadius: "50%",
                    }}
                />
            </StyledImage>
            <TextWrapper>
                <Text tag="h5">{person?.name}</Text>
                <Text
                    tag="h6"
                    additionalStyles={{
                        color: colors.base.grey500,
                    }}
                >
                    {person?.role + " | " + person?.department}
                </Text>
            </TextWrapper>
            <ArrowContainer>
                <SvgIcon svg="arrowRight" />
            </ArrowContainer>
        </PeopleTag>
    );
};

export default PersonTag;
