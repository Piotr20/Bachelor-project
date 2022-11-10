import React, { FC, ReactEventHandler, ReactNode, useState } from "react";
import styled, { CSSObject } from "styled-components";
import { SvgIcon } from "~/components/svg-icon";
import { flexCenter } from "~/styles/style.helper";
import { mq } from "~/util/media-queries";
import { colors } from "../../util/colorPalette";
import { ifProp } from "styled-tools";

type ButtonProps = {
    children: ReactNode;
    kind: "primary" | "secondary";
    disabled?: boolean;
    onClick?: ReactEventHandler;
    additionalStyles?: CSSObject;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export const Button: FC<ButtonProps> = ({
    children,
    kind,
    disabled,
    onClick,
    additionalStyles,
}) => {
    return (
        <StyledButton
            onClick={onClick}
            kind={kind}
            disabled={disabled}
            additionalStyles={additionalStyles}
        >
            {children}
        </StyledButton>
    );
};

export const StyledButton = styled.button<{
    kind: "primary" | "secondary";
    additionalStyles?: CSSObject;
}>(
    ({ kind, additionalStyles }) => ({
        border: "none",
        outline: "none",
        borderRadius: "64px",
        lineHeight: "155%",
        cursor: "pointer",
        letterSpacing: "2px",
        padding: "8px 36px",
        fontSize: "16px",
        ...additionalStyles,
        [mq("lg")]: {
            padding: "8px 36px",
            fontSize: "16px",
        },
    }),
    ifProp({ kind: "primary" }, () => ({
        backgroundColor: colors.primary.black,
        color: colors.base.white,
        transition: "all 0.3s ease",
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
        padding: "6px 34px",
        ["&:hover"]: {
            backgroundColor: colors.primary.black,
            color: colors.base.white,
        },
        [mq("md")]: {},
        [mq("lg")]: {
            padding: "6px 34px",
        },
    }))
);
