import { useEffect } from "react";
import styled from "styled-components";
import { Project, Skill, User } from "~/models";
import { useNavStore } from "~/store/store";
import { Button } from "../button/button";
import ImpactImage from "../image/image";
import Text from "../typography/text";
import { useRouter } from "next/router";

type SearchBoxProps = {
    data: User & Project & Skill;
};

const SearchBox = ({ data }: SearchBoxProps) => {
    const { toggleSlider, openSlider, setDataInSlider } = useNavStore(
        (state) => ({
            openSlider: state.openSlider,
            toggleSlider: state.toggleSlider,
            setDataInSlider: state.setDataInSlider,
        })
    );
    const router = useRouter();

    function handleSlideIn() {
        toggleSlider();
        setDataInSlider(data);
    }
    /*     useEffect(() => {
        if (router.isReady) {
            router.replace({
                query: {
                    ...router.query,
                    openSlider: `${openSlider}`,
                    openedResult: `${data?._id}`,
                },
            });
        }
    }, [openSlider]); */
    /*     useEffect(() => {
        if (router.isReady) {
            router.replace({
                query: {
                    ...router.query,
                    openSlider: `${openSlider}`,
                    openedResult: `${data?._id}`,
                },
            });
        }
    }, [openSlider]); */

    return (
        <StyledSearchBox>
            <ImpactImage src={data?.imageURL} containerWidth="100%" />
            <Text
                tag="h4"
                additionalStyles={{
                    textAlign: "center",
                    marginBottom: "12px",
                }}
            >
                {data?.name}
            </Text>
            <Button
                label="View"
                variant="Filled-Dark"
                buttonType="CTA"
                buttonSize="medium"
                disabled={false}
                onClick={handleSlideIn}
            />
        </StyledSearchBox>
    );
};

export default SearchBox;

export const StyledSearchBox = styled.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
});
