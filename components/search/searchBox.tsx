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
    const { toggleSlider, openSlider, setOpenSlider } = useNavStore(
        (state) => ({
            openSlider: state.openSlider,
            toggleSlider: state.toggleSlider,
            setOpenSlider: state.setOpenSlider,
        })
    );
    const router = useRouter();

    function handleSlideIn() {
        toggleSlider();
    }
    useEffect(() => {
        if (router.isReady) {
            if (router.query.openSlider && router.query.openSlider === "true") {
                setOpenSlider(true);
            } else if (
                router.query.openSlider &&
                router.query.openSlider === "false"
            ) {
                setOpenSlider(false);
            }
        }
    }, [router.isReady]);

    useEffect(() => {
        if (router.isReady) {
            router.replace({
                query: {
                    ...router.query,
                    openSlider: `${openSlider}`,
                    openedResult: `${data?._id}`,
                },
            });
        }
    }, [openSlider]);

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
