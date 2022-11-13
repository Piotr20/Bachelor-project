import { useEffect } from "react";
import styled from "styled-components";
import { Project, Skill, User } from "~/models";
import { useNavStore } from "~/store/store";
import { Button } from "../button/button";
import ImpactImage from "../image/image";
import Text from "../typography/text";
import { useRouter } from "next/router";
import { colors } from "~/util/colorPalette";
import { mq } from "~/util/media-queries";
import { SvgIcon } from "../svg-icon";
import { handleSlideIn } from "~/lib/helpers/search.hepler";

type PeopleSearchBoxProps = {
    data: User;
};

const PeopleSearchBox = ({ data }: PeopleSearchBoxProps) => {
    const { openSlider, setDataInSlider, setOpenSlider, setDataType } = useNavStore((state) => ({
        openSlider: state.openSlider,
        setDataInSlider: state.setDataInSlider,
        setOpenSlider: state.setOpenSlider,
        setDataType: state.setDataType,
    }));
    const router = useRouter();

    return (
        <StyledSearchBox>
            <StyledImage>
                <ImpactImage
                    src={data?.imageURL}
                    alt="alt text"
                    layout="fill"
                    objectFit="contain"
                    ratio="1/1"
                    containerWidth="100%"
                    style={{
                        borderRadius: "50%",
                    }}
                />
            </StyledImage>
            <Text
                tag="h4"
                additionalStyles={{
                    textAlign: "center",
                    marginTop: "calc(10% + 28px)",
                    marginBottom: "4px",
                    minHeight: "5ch",
                    maxHeight: "5ch",
                    overflow: "hidden",
                    [mq("lg")]: {
                        marginBottom: "4px",
                        marginTop: "calc(12.5% + 16px)",
                        minHeight: "2.5ch",
                        maxHeight: "2.5ch",
                    },
                }}
            >
                {data?.name}
            </Text>
            <Text
                tag="p"
                additionalStyles={{
                    color: colors.primary.lightGrey,
                    fontWeight: 400,
                    marginTop: "4px",
                    minHeight: "5ch",
                    maxHeight: "5ch",
                    overflow: "hidden",
                    textAlign: "center",
                    fontSize: "16px",
                    [mq("lg")]: {
                        minHeight: "2.5ch",
                        maxHeight: "2.5ch",
                        fontSize: "20px !important",
                    },
                    [mq("xl")]: {
                        fontSize: "22px !important",
                    },
                }}
            >
                {data?.role + " | " + data?.department}
            </Text>
            <CTASection>
                <Button
                    onClick={() =>
                        handleSlideIn(data, setOpenSlider, setDataInSlider, setDataType, "person", openSlider)
                    }
                    kind="link"
                >
                    Show details <SvgIcon svg="arrowRight" />
                </Button>
            </CTASection>
        </StyledSearchBox>
    );
};

export default PeopleSearchBox;

export const StyledSearchBox = styled.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "white",
    boxShadow: "0px 22px 30px -10px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    position: "relative",
    marginTop: "40px",
    [mq("lg")]: {
        marginTop: "50px",
    },
});

export const StyledImage = styled.div({
    width: "80px",
    borderRadius: "50%",
    position: "absolute",
    aspectRatio: "1/1",
    top: "0",
    transform: "translate(0,-50%)",
    backgroundColor: colors.base.white,
    padding: "4px",
    [mq("lg")]: {
        width: "108px",
    },
});

export const CTASection = styled.div({
    width: "108%",
    marginTop: "12px",
    paddingTop: "8px",
    borderTop: `1px solid ${colors.base.grey500}`,
    display: "flex",
    justifyContent: "center",
    [mq("lg")]: {
        width: "80%",
        marginTop: "20px",
    },
});
