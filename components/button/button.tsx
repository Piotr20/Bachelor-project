import React, { FC, ReactEventHandler, ReactNode, useState } from "react";
import styled from "styled-components";
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
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export const Button: FC<ButtonProps> = ({
    children,
    kind,
    disabled,
    onClick,
}) => {
    return (
        <StyledButton onClick={onClick} kind={kind} disabled={disabled}>
            {children}
        </StyledButton>
    );
};

export const StyledButton = styled.button<{
    kind: "primary" | "secondary";
}>(
    ({ kind }) => ({
        border: "none",
        outline: "none",
        borderRadius: "40px",
        lineHeight: "155%",
        cursor: "pointer",
        [mq("lg")]: {},
    }),
    ifProp({ kind: "primary" }, () => ({
        fontSize: "14px",
        padding: "6px 16px",
        backgroundColor: colors.secondary.lightYellow,
        color: colors.primary.black,
        [mq("md")]: {
            fontSize: "16px",
            padding: "8px 20px",
        },
        [mq("lg")]: {
            padding: "10px 44px",
        },
    }))
);
