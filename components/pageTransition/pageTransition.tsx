import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../util/colorPalette";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { animationSettings } from "./animationSettings";

type PageTransitionProps = {
    children: ReactNode;
    animationType?: "fade" | "blip";
};

const PageTransition = ({ children, animationType = "blip" }: PageTransitionProps) => {
    const { pathname } = useRouter();

    const variants = {
        fadeIn: {
            opacity: 1,
            transition: {
                duration: animationSettings.fadeDuration,
            },
        },
        fadeOut: {
            opacity: 0,
            transition: {
                duration: animationSettings.fadeDuration,
            },
        },
    };
    if (pathname !== "/searchResults") {
        return (
            <PageBackground>
                <AnimatePresence initial={true} mode="wait">
                    <motion.div key={pathname} variants={variants} initial={"fadeOut"} animate={"fadeIn"}>
                        {children}
                    </motion.div>
                </AnimatePresence>
            </PageBackground>
        );
    } else {
        return <PageBackground>{children}</PageBackground>;
    }
};

export default PageTransition;

export const PageBackground = styled.div(() => ({
    margin: 0,
    padding: 0,
    width: "100%",
}));
