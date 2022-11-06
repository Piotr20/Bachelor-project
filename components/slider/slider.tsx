import { useEffect } from "react";
import styled from "styled-components";
import { useNavStore } from "~/store/store";

import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { SvgIcon } from "../svg-icon";

const SlideIn = () => {
    const router = useRouter();
    const { openSlider, setOpenSlider } = useNavStore((state) => ({
        openSlider: state.openSlider,
        setOpenSlider: state.setOpenSlider,
    }));

    useEffect(() => {
        if (router.query.openSlider === "true") {
            setOpenSlider(true);
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
                    <div
                        onClick={() => {
                            setOpenSlider(false);
                        }}
                    >
                        <SvgIcon svg="checked" />
                    </div>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique voluptatem recusandae
                    eveniet, molestiae voluptas repellat porro facere obcaecati itaque suscipit illum unde
                    maiores nostrum quis atque sit laborum nihil!
                </StyledSliderWrapper>
            </motion.div>
        </>
    );
};

export default SlideIn;

export const StyledSliderWrapper = styled.div({
    backgroundColor: "red",
    height: "100vh",
});
