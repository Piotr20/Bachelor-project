import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { mq } from "../../util/media-queries";
import { colors } from "../../util/colorPalette";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { animationSettings } from "./animationSettings";

type PageTransitionProps = {
    children: ReactNode;
    animationType?: "fade" | "blip";
};

const PageTransition = ({
    children,
    animationType = "blip",
}: PageTransitionProps) => {
    const { asPath } = useRouter();

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
        shrinkHeight: {
            backgroundColor: colors.secondary.lightYellow,
            scaleY: 0.005,
            transition: {
                duration: animationSettings.blipDuration,
            },
        },
        shrinkWidth: {
            scaleX: 0.2,
            transition: {
                duration: animationSettings.blipDuration,
                delay: 0.4,
            },
        },
        disappear: {
            opacity: 0,
            transition: {
                duration: 0.3,
                delay: 0.7,
            },
        },
        initial: {
            scaleY: 0.005,
            scaleX: 0.2,
            opacity: 0,
            backgroundColor: colors.secondary.lightYellow,
        },
        appear: {
            opacity: 1,
            transition: {
                duration: animationSettings.blipDuration,
                delay: 0.3,
            },
        },
        stretchWidth: {
            scaleX: 1,
            transition: {
                duration: animationSettings.blipDuration,
                delay: 0.4,
            },
        },
        stretchHeight: {
            scaleY: 1,
            transition: {
                duration: animationSettings.blipDuration,
                delay: 0.85,
            },
        },
        colorRemove: {
            backgroundColor: "transparent",
            transition: {
                duration: animationSettings.blipDuration,
                delay: 1.25,
            },
        },
    };
    return (
        <PageBackground>
            <AnimatePresence initial={true} mode="wait">
                <motion.div
                    key={asPath}
                    variants={variants}
                    initial={animationType === "blip" ? "initial" : "fadeOut"}
                    animate={
                        animationType === "blip"
                            ? [
                                  "appear",
                                  "stretchWidth",
                                  "stretchHeight",
                                  "colorRemove",
                              ]
                            : "fadeIn"
                    }
                    exit={
                        animationType === "blip"
                            ? ["shrinkHeight", "shrinkWidth", "disappear"]
                            : "fadeOut"
                    }
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </PageBackground>
    );
};

export default PageTransition;

export const PageBackground = styled.div(() => ({
    margin: 0,
    padding: 0,
    width: "100%",
}));
