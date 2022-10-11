import { ReactEventHandler, ReactNode, useState } from "react";
import styled from "styled-components";
import { mq } from "../../util/media-queries";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "../../util/colorPalette";
import { SvgIcon, TLASvg } from "../svg-icon";

type AccordionItemProps = {
    index: number;
    itemData: AccordionItemData;
    onToggle: ReactEventHandler;
    active: boolean;
    borderTop?: boolean;
    borderBottom?: boolean;
    icon?: keyof typeof TLASvg | ReactNode;
    paddingInner?: boolean;
};

export type AccordionItemData = {
    heading: string;
    body: string | ReactNode;
};

const AccordionItem = ({
    itemData,
    onToggle,
    active,
    borderTop,
    borderBottom,
    index,
    paddingInner,

    icon,
}: AccordionItemProps) => {
    const { heading, body } = itemData;
    return (
        <AccordionItemWrapper
            borderTop={borderTop}
            borderBottom={borderBottom}
            paddingInner={paddingInner}
            active={active}
        >
            <AccordionItemHeading
                aria-controls={`heading-${index}}`}
                aria-expanded={active}
                onClick={onToggle}
            >
                <HeadingTextWrapper>
                    {icon}
                    <AccordionH2>{heading}</AccordionH2>
                </HeadingTextWrapper>
                <motion.div
                    initial={{ rotate: 90 }}
                    animate={
                        active
                            ? {
                                  rotate: -90,
                                  transition: {
                                      duration: 0.5,
                                  },
                              }
                            : {}
                    }
                    exit={{
                        rotate: 90,
                        transition: {
                            duration: 0.5,
                            type: "tween",
                        },
                    }}
                >
                    <SvgIcon size={16} svg="chevronRight" />
                </motion.div>
            </AccordionItemHeading>
            <AnimatePresence>
                {active ? (
                    <motion.div
                        initial={{
                            height: 0,
                            opacity: 0,
                        }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                            transition: {
                                duration: 0.5,
                            },
                        }}
                        exit={{
                            height: 0,
                            overflow: "hidden",
                            transition: { duration: 0.5 },
                        }}
                    >
                        <div aria-hidden={active} id={`content-${index}}`}>
                            <AccordionParagraph>{body}</AccordionParagraph>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </AccordionItemWrapper>
    );
};

export default AccordionItem;

export const AccordionItemWrapper = styled.li<{
    active: boolean;
    borderTop?: boolean;
    borderBottom?: boolean;
    paddingInner?: boolean;
}>(({ active, borderTop, borderBottom, paddingInner }) => ({
    transition: "all .5s ease-in-out",
    paddingBottom: active ? "16px" : 0,
    paddingTop: "16px",
    paddingRight: paddingInner ? "50px" : "",
    paddingLeft: paddingInner ? "50px" : "",
    borderColor: colors.base.grey300,
    borderBottom:
        borderBottom && !(borderBottom && borderTop) ? "1px solid" : "none",
    borderTop: borderTop ? "1px solid" : "none",
    ["&:nth-of-type(n+2)"]: {
        paddingTop: borderTop || borderBottom ? "16px" : 0,
        [mq("md")]: {
            paddingTop: borderTop || borderBottom ? "24px" : 0,
        },
        [mq("lg")]: {
            paddingTop: borderTop || borderBottom ? "32px" : 0,
        },
    },
    [mq("md")]: {
        paddingBottom: active ? "24px" : "8px",
        paddingTop: "24px",
    },
    [mq("lg")]: {
        paddingBottom: active ? "32px" : "16px",
        paddingTop: "32px",
    },
}));

export const AccordionItemHeading = styled.button<{}>(({}) => ({
    padding: 0,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "white",
    border: "none",
    paddingBottom: "16px",
    ["svg"]: {
        width: "14px !important",
        height: "14px !important",
        [mq("md")]: {
            width: "16px !important",
            height: "16px !important",
        },
    },
}));

export const HeadingTextWrapper = styled.div<{}>(({}) => ({
    display: "flex",
    alignItems: "center",
    ["&>span"]: {
        marginRight: "16px",
    },
}));

export const AccordionH2 = styled.h3<{}>(({}) => ({
    margin: 0,
    color: colors.primary.black,
    fontWeight: "700",
    fontSize: "16px",
    lineHeight: "125%",
    [mq("md")]: {
        fontSize: "18px",
    },
    [mq("lg")]: {
        fontSize: "21px",
    },
}));
export const AccordionParagraph = styled.p<{}>(({}) => ({
    margin: 0,
    color: colors.primary.black,
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "125%",
}));
