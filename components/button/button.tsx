import React, { FC, ReactEventHandler, ReactNode, useState } from "react";
import styled, { CSSObject } from "styled-components";
import { SvgIcon } from "~/components/svg-icon";
import { flexCenter } from "~/styles/style.helper";
import { mq } from "~/util/media-queries";
import { colors } from "../../util/colorPalette";
import { ifProp } from "styled-tools";

type ButtonProps = {
    children: ReactNode;
    kind: "primary" | "secondary" | "link" | "search";
    disabled?: boolean;
    onClick?: ReactEventHandler;
    additionalStyles?: CSSObject;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export const Button: FC<ButtonProps> = ({ children, kind, disabled, onClick, additionalStyles }) => {
    return (
        <StyledButton onClick={onClick} kind={kind} disabled={disabled} additionalStyles={additionalStyles}>
            {children}
        </StyledButton>
    );
};

export const StyledButton = styled.button<{
    kind: "primary" | "secondary" | "link" | "search";
    additionalStyles?: CSSObject;
}>(
    ({ kind, additionalStyles }) => ({
        border: "none",
        outline: "none",

        lineHeight: "155%",
        cursor: "pointer",
        letterSpacing: "1.75px",
        padding: "8px 36px",
        fontSize: "16px",
        ...additionalStyles,
        [mq("lg")]: {
            padding: "8px 36px",
        },
    }),
    ifProp({ kind: "primary" }, () => ({
        backgroundColor: colors.primary.black,
        color: colors.base.white,
        transition: "all 0.3s ease",
        borderRadius: "48px",
        ["&:hover"]: {
            backgroundColor: colors.secondary.lightYellow,
            color: colors.primary.black,
        },
        [mq("md")]: {},
        [mq("lg")]: {},
    })),
    ifProp({ kind: "secondary" }, () => ({
        backgroundColor: colors.base.white,
        color: colors.primary.black,
        border: `2px solid ${colors.primary.black}`,
        transition: "all 0.3s ease",
        borderRadius: "48px",
        padding: "6px 34px",
        ["&:hover"]: {
            backgroundColor: colors.primary.black,
            color: colors.base.white,
        },
        [mq("md")]: {},
        [mq("lg")]: {
            padding: "6px 34px",
        },
    })),
    ifProp({ kind: "link" }, () => ({
        display: "flex",
        alignItems: "center",
        backgroundColor: colors.base.white,
        color: colors.primary.black,
        padding: "0 4px",
        backgroundImage: "linear-gradient(#feff00,#feff00)",
        backgroundSize: "0 40%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 95%",
        transition: "all 0.1s ease",
        letterSpacing: "1px",
        ["svg"]: {
            transition: "margin-left .15s ease",
            marginLeft: "8px",
            width: "12px !important",
            height: "12px !important",
        },
        ["&:hover"]: {
            backgroundImage: "linear-gradient(#feff00,#feff00)",
            backgroundSize: "100% 40%",

            backgroundPosition: "0 95%",
            ["svg"]: {
                marginLeft: "16px",
            },
        },
        [mq("md")]: {},
        [mq("lg")]: {
            padding: "0 8px",
        },
    })),
    ifProp({ kind: "search" }, () => ({
        backgroundColor: colors.secondary.lightYellow,
        color: colors.primary.black,
        transition: "all 0.3s ease",
        borderRadius: "48px",
        display: "flex",
        alignItems: "center",
        padding: "8px 12px",
        ["&:hover"]: {
            backgroundColor: colors.secondary.darkYellow,
            color: colors.primary.black,
        },
        ["p"]: {
            display: "none",
            [mq("lg")]: { display: "block" },
        },
        [mq("lg")]: {},
        ["span"]: {
            width: "16px !important",
            height: "16px !important",
            [mq("lg")]: {
                marginRight: "8px",
                width: "20px !important",
                height: "20px !important",
            },
        },
    }))
);
