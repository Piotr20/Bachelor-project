import { useEffect, useState } from "react";
import styled from "styled-components";
import { Project, Skill, User } from "~/models";
import { useNavStore } from "~/store/store";
import { Button } from "../button/button";
import ImpactImage from "../image/image";
import Text from "../typography/text";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

const SlideIn = () => {
    const router = useRouter();
    const [openSlider, setOpenSlider] =
        useState<boolean | undefined>(undefined);

    return (
        <>
            {openSlider ? (
                <AnimatePresence initial={true} mode="wait">
                    <motion.div
                        key={router?.query?.openSlider?.toString()}
                        initial={{
                            position: "fixed",
                            top: 0,
                            right: "-100%",
                            width: "50%",
                            height: "100vh",
                            zIndex: 100,
                        }}
                        animate={{
                            right: 0,
                            transition: {
                                duration: 0.5,
                            },
                        }}
                        exit={{
                            right: "-100%",
                            transition: {
                                duration: 0.5,
                            },
                        }}
                    >
                        <StyledSliderWrapper>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Similique voluptatem recusandae eveniet,
                            molestiae voluptas repellat porro facere obcaecati
                            itaque suscipit illum unde maiores nostrum quis
                            atque sit laborum nihil!
                        </StyledSliderWrapper>
                    </motion.div>
                </AnimatePresence>
            ) : null}
        </>
    );
};

export default SlideIn;

export const StyledSliderWrapper = styled.div({
    backgroundColor: "red",
    height: "100vh",
});
