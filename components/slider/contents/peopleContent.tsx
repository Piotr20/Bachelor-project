import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ImpactImage from "~/components/image/image";
import { SvgIcon } from "~/components/svg-icon";
import Text from "~/components/typography/text";
import { handleSlideIn } from "~/lib/helpers/search.hepler";
import { Project, Skill, User } from "~/models";
import { useNavStore } from "~/store/store";
import { colors } from "~/util/colorPalette";
import { mq } from "~/util/media-queries";

type SliderOverviewProps = {
    people?: User[];
};

const PeopleContent = ({ people }: SliderOverviewProps) => {
    const {
        openSlider,
        sliderData,
        breadcrumbData,
        setDataInSlider,
        setOpenSlider,
        setDataType,
        setBreadcrumbData,
    } = useNavStore((state) => ({
        openSlider: state.openSlider,
        toggleSlider: state.toggleSlider,
        sliderData: state.sliderData,
        breadcrumbData: state.breadcrumbData,
        setDataInSlider: state.setDataInSlider,
        setOpenSlider: state.setOpenSlider,
        setDataType: state.setDataType,
        setBreadcrumbData: state.setBreadcrumbData,
    }));
    const router = useRouter();

    return (
        <PeopleContainer>
            {people?.map((emplouee: User, key: number) => {
                return (
                    <PeopleTag
                        onClick={() => {
                            handleSlideIn(
                                emplouee,
                                setOpenSlider,
                                setDataInSlider,
                                undefined,
                                "person",
                                openSlider
                            );
                            setBreadcrumbData({ ...sliderData, type: router?.query?.type });
                        }}
                        key={key}
                    >
                        <StyledImage>
                            <ImpactImage
                                src={emplouee?.imageURL}
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
                            <Text tag="h5">{emplouee?.name}</Text>
                            <Text
                                tag="h6"
                                additionalStyles={{
                                    color: colors.base.grey500,
                                }}
                            >
                                {emplouee?.role + " | " + emplouee?.department}
                            </Text>
                        </TextWrapper>
                        <ArrowContainer>
                            <SvgIcon svg="arrowRight" />
                        </ArrowContainer>
                    </PeopleTag>
                );
            })}
        </PeopleContainer>
    );
};

export default PeopleContent;

export const PeopleContainer = styled.div({
    marginTop: "24px",
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    [mq("lg")]: {
        gap: "12px",
    },
});

export const PeopleTag = styled.div({
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
    boxShadow: "0px 22px 30px -10px rgba(0, 0, 0, 0.1)",
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

export const TextWrapper = styled.div({
    [mq("lg")]: {},
});
