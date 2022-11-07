import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavStore } from "~/store/store";

import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { SvgIcon } from "../svg-icon";
import ImpactImage from "../image/image";
import { useSearchStore } from "~/store/searchStore";
import { Project, Skill, User } from "~/models";

const SlideIn = () => {
    const router = useRouter();
    const [sliderData, setSliderData] = useState<User & Project & Skill>();
    const { openSlider, setOpenSlider } = useNavStore((state) => ({
        openSlider: state.openSlider,
        setOpenSlider: state.setOpenSlider,
    }));
    const { searchResults, setSearchResults } = useSearchStore((state) => ({
        searchResults: state.searchResults,
        setSearchResults: state.setSearchResults,
    }));

    useEffect(() => {
        if (router.query.openSlider === "true") {
            setOpenSlider(true);
            const findResultById = searchResults?.find(
                (result: User & Project & Skill) => result?._id === router.query.openedId
            );
            if (findResultById) {
                setSliderData(findResultById);
            }
        } else if (router.query.openSlider === "false") {
            setOpenSlider(false);
        }
    }, [router.query.openSlider]);

    return (
        <>
            <motion.div
                initial={{
                    position: "fixed",
                    top: 0,
                    right: "-100%",
                    width: "50%",
                    height: "100vh",
                    zIndex: 100,
                }}
                animate={
                    openSlider
                        ? {
                              right: 0,
                              transition: {
                                  duration: 0.5,
                              },
                          }
                        : {
                              right: "-100%",
                              transition: {
                                  duration: 0.5,
                              },
                          }
                }
            >
                <StyledSliderWrapper>
                    <StyledIconContainer
                        onClick={() => {
                            setOpenSlider(false);
                        }}
                    >
                        <SvgIcon svg="sliderArrowRight" />
                    </StyledIconContainer>
                    <ImpactImage
                        src={sliderData?.imageURL}
                        alt="alt text"
                        layout="fill"
                        ratio="1/1"
                        containerWidth="50%"
                        style={{ borderRadius: "50%" }}
                    />
                </StyledSliderWrapper>
            </motion.div>
        </>
    );
};

export default SlideIn;

export const StyledSliderWrapper = styled.div({
    backgroundColor: "white",
    padding: "24px",
    height: "100vh",
    boxShadow: " 0px -22px 30px -10px rgba(0, 0, 0, 0.16)",
});

export const StyledIconContainer = styled.div({
    cursor: "pointer",
    ["svg"]: {
        width: "32px !important",
        height: "32px !important",
    },
});
